import { USER_COOKIE_FIELDS } from "$lib/constants";
import { deleteCookie } from "$utils";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  deleteCookie(cookies, "auth_token");
  USER_COOKIE_FIELDS.forEach((field) => {
    deleteCookie(cookies, `user_info-${field}`);
  });
  throw redirect(303, "/login");
}) satisfies PageServerLoad;
