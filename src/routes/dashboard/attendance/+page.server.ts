import type { PageServerLoad } from "./$types";
import API from "$lib/api.backend";

export const load = (async ({ locals }) => {
  const timestamps = await API.get_all_timestamps(locals.token);
  return { timestamps };
}) satisfies PageServerLoad;
