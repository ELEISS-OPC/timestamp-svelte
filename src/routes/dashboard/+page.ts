import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = (async () => {
  return redirect(302, "/dashboard/summary");
}) satisfies PageLoad;
