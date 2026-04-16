import API from "$lib/api.backend";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { AddEmployeeSchema } from "./schema";
import { fail } from "@sveltejs/kit";
import errors from "$lib/errors";

export const load = (async ({ locals }) => {
  const users = await API.get_all_employees(locals.token);

  return {
    users,
    user: locals.user,
    form: await superValidate(zod4(AddEmployeeSchema)),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  add_user: async (event) => {
    const form = await superValidate(event, zod4(AddEmployeeSchema));
    if (!form.valid) return fail(400, { form });

    try {
      const data = await API.create_employee(event.locals.token, form.data);
      return {
        form,
        responseData: data,
      };
    } catch (err) {
      if (err instanceof errors.UnauthorizedError) {
        return fail(401, { form, message: "Unauthorized" });
      }
      if (err instanceof errors.UserAlreadyExistsError) {
        return fail(409, {
          form,
          message: "A user with that email already exists.",
        });
      }
      if (err instanceof errors.ServerError) {
        return fail(500, {
          form,
          message: "Server error. Please try again later.",
        });
      }
      console.error("Unexpected Error:", err);
      return fail(500, { form, message: "An unexpected error occurred." });
    }
  },
};
