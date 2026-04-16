import type { PageServerLoad } from "./$types";
import API from "$lib/api.backend";

export const load = (async ({ locals }) => {
  const users = await API.get_all_employees(locals.token);

  return { users, user: locals.user };
}) satisfies PageServerLoad;
