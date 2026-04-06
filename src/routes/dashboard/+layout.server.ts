import type { LayoutServerLoad } from "./$types";
import dicebear from "$lib/api.dicebear";
import type { Employee } from "$lib/types";

export const load = (async ({ locals }) => {
  const data: Employee = locals.user;

  if (!data.avatar_url) {
    const fallbackImg = await dicebear.getEmployeeAvatar(data);
    data.avatar_url = fallbackImg;
    data.avatar_url_preview = fallbackImg;
  }

  return data;
}) satisfies LayoutServerLoad;
