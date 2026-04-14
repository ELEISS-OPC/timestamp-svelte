import type { PageServerLoad } from "./$types";
import API from "$lib/api.backend";
import type { AttendanceView } from "$lib/types";

const options = ["today", "yesterday", "history"] as const;

export const load = (async ({ locals, url }) => {
  const viewParam = url.searchParams.get("view");

  const view: AttendanceView = options.includes(viewParam as any)
    ? (viewParam as AttendanceView)
    : "today";

  const timestampdata = await API.get_all_timestamps(locals.token, view);

  return { timestampdata, view };
}) satisfies PageServerLoad;
