import type { LayoutServerLoad } from "./$types";
import dicebear from "$lib/api.dicebear";
import type { Employee } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import { Role } from "$lib/enums";

export const load = (async ({ locals }) => {
  const data: Employee = locals.user;

  if (data.role_id === Role.Employee) {
    throw redirect(302, "/timestamp");
  }

  if (!data.avatar_url) {
    const fallbackImg = await dicebear.getEmployeeAvatar(data);
    data.avatar_url = fallbackImg;
    data.avatar_url_preview = fallbackImg;
  }

  return data;
}) satisfies LayoutServerLoad;
