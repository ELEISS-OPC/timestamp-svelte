import { COOKIE_EXPIRATION_MINUTES, MODE } from "$env/static/private";
import API from "$lib/api.backend";
import {
  OPTIONAL_USER_COOKIE_FIELDS,
  USER_COOKIE_FIELDS,
} from "$lib/constants";
import { Role } from "$lib/enums";
import errors from "$lib/errors";
import { type Employee } from "$lib/types";
import { optionalSetCookie, setCookie } from "$utils";
import { fail, isRedirect, redirect } from "@sveltejs/kit";
import { message, setError, superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types.js";
import { formSchema } from "./schema";

const cookieOptions = {
  maxAge: Number(COOKIE_EXPIRATION_MINUTES) * 60,
  secure: MODE === "production",
};

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(formSchema)),
  };
};

export const actions: Actions = {
  login: async (event) => {
    const form = await superValidate(event, zod4(formSchema));
    const { cookies } = event;
    let access_token: string;

    if (!form.valid) return fail(400, { form });

    try {
      const response = await API.login(form.data);
      access_token = response.access_token;
    } catch (err) {
      if (err instanceof errors.InvalidCredentialsError) {
        return setError(form, "password", err.message, { status: 401 });
      }
      if (err instanceof errors.UserNotFoundError) {
        return setError(form, "email", err.message, { status: 404 });
      }
      if (err instanceof errors.ServerError) {
        return message(
          form,
          "Our servers are having a moment. Please try again later.",
          {
            status: 500,
          },
        );
      }

      console.error("Unexpected Login Error:", err);
      return message(form, "An unexpected error occurred.", { status: 500 });
    }

    try {
      const userInfo: Employee = await API.get_my_info(access_token);

      USER_COOKIE_FIELDS.forEach((field: string) => {
        const value = userInfo[field as keyof Employee];
        if (value === undefined || value === null) {
          return; // Skip undefined or null values
        }

        if (OPTIONAL_USER_COOKIE_FIELDS.includes(field)) {
          optionalSetCookie(
            cookies,
            `user_info-${field}`,
            value,
            cookieOptions,
          );
        } else {
          setCookie(cookies, `user_info-${field}`, value, cookieOptions);
        }
      });
      setCookie(cookies, "auth_token", access_token, {
        maxAge: Number(COOKIE_EXPIRATION_MINUTES) * 60,
        secure: MODE === "production",
      });

      switch (userInfo.role_id) {
        case Role.Employee:
          throw redirect(303, "/timestamp");
        case Role.Officer:
          throw redirect(303, "/dashboard");
        case Role.Admin:
          throw redirect(303, "/dashboard");
        default:
          throw new Error("Unknown user role");
      }
    } catch (err) {
      if (isRedirect(err)) throw err; // Let redirects pass through

      if (err instanceof errors.UserNotFoundError) {
        return setError(form, "email", err.message, { status: 404 });
      }
      if (err instanceof errors.ServerError) {
        return message(
          form,
          "Our servers are having a moment. Please try again later.",
          {
            status: 500,
          },
        );
      }
      console.error("Failed to fetch user info:", err);
      return message(form, "An unexpected error occurred.", { status: 500 });
    }
  },
};
