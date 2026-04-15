import { Role } from "$lib/enums";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  switch (locals.user.role) {
    case Role.Employee:
      return redirect(302, "/timestamp");
    case Role.Officer:
      return redirect(302, "/dashboard");
    case Role.Admin:
      return redirect(302, "/dashboard");
    default:
      return redirect(302, "/login");
  }
}) satisfies PageServerLoad;
