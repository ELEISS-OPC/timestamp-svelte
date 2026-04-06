import API from "$lib/api.backend";
import { MODE, COOKIE_EXPIRATION_MINUTES } from "$env/static/private";
import {
  OPTIONAL_USER_COOKIE_FIELDS,
  PROTECTED_ROUTES,
  USER_COOKIE_FIELDS,
} from "$lib/constants";
import type { Employee } from "$lib/types";
import {
  deleteCookie,
  optionalSetCookie,
  setCookie,
  checkValidUserInfo,
} from "$lib/utils";
import { type Handle, redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies, url } = event;
  const isLoggingIn = url.pathname === "/login";
  const token = cookies.get("auth_token");

  if (!token && !isLoggingIn) {
    throw redirect(303, "/login");
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route: string) =>
    url.pathname.startsWith(route),
  );

  if (isProtectedRoute && !token) {
    // User is trying to access a private area without a token
    throw redirect(303, "/login");
  }

  if (isLoggingIn && token) {
    // User is already logged in, don't show the login page again
    throw redirect(303, "/dashboard");
  }

  const userInfoCookie = {
    id: cookies.get("user_info-id"),
    first_name: cookies.get("user_info-first_name"),
    middle_name: cookies.get("user_info-middle_name"),
    last_name: cookies.get("user_info-last_name"),
    email: cookies.get("user_info-email"),
    role_id: cookies.get("user_info-role_id"),
    avatar_url: cookies.get("user_info-avatar_url"),
    avatar_url_preview: cookies.get("user_info-avatar_url_preview"),
  };
  let userInfo: Employee = {} as Employee;
  const validUserInfoCookie = checkValidUserInfo(userInfoCookie);

  // If we have a token but no user info cookie, fetch the user info and set the cookie
  if (token && !validUserInfoCookie) {
    try {
      userInfo = await API.get_my_info(token);

      if (!userInfo) {
        throw new Error("Failed to fetch user info with token");
      }

      // Set individual cookies for each user info field
      USER_COOKIE_FIELDS.forEach((field: string) => {
        const value = (userInfo as Employee)[field as keyof Employee];
        if (OPTIONAL_USER_COOKIE_FIELDS.includes(field)) {
          optionalSetCookie(cookies, `user_info-${field}`, value as any);
        } else {
          setCookie(cookies, `user_info-${field}`, value as any, {
            maxAge: Number(COOKIE_EXPIRATION_MINUTES) * 60,
            secure: MODE === "production",
          });
        }
      });
    } catch (err) {
      console.error("Failed to fetch user info with token:", err);
      deleteCookie(cookies, "auth_token");
      USER_COOKIE_FIELDS.forEach((field) => {
        deleteCookie(cookies, `user_info-${field}`);
      });
      throw redirect(303, "/login");
    }
  } else if (validUserInfoCookie) {
    // If we have a user info cookie, try to parse it
    try {
      USER_COOKIE_FIELDS.forEach((field: string) => {
        const value = cookies.get(`user_info-${field}`);
        if (value) {
          (userInfo as any)[field] = value;
        }
      });
    } catch (err) {
      console.error("Failed to parse user info cookie:", err);
      USER_COOKIE_FIELDS.forEach((field: string) => {
        deleteCookie(cookies, `user_info-${field}`);
      });
      throw redirect(303, "/login");
    }
  }

  // Make user info available in the event.locals for the rest of the app
  // Usage:
  //  In a +*.server.ts:
  //  export const load = async ({ locals }) => {
  //    const user = locals.user; // This will be the user info if available
  //    ...
  //  }
  event.locals.user = userInfo;

  return await resolve(event);
};
