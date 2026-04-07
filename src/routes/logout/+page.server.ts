import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { type Cookies } from "@sveltejs/kit";

const deleteCookie = (cookies: Cookies, name: string) => {
  cookies.delete(name, { path: "/" });
};

const userCookieFields = [
  "id",
  "first_name",
  "middle_name",
  "last_name",
  "email",
  "role_id",
  "avatar_url",
  "avatar_url_preview",
];

export const load = (async ({ cookies }) => {
  deleteCookie(cookies, "auth_token");
  userCookieFields.forEach((field) => {
    deleteCookie(cookies, `user_info-${field}`);
  });
  throw redirect(303, "/login");
}) satisfies PageServerLoad;
