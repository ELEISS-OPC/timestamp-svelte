import type { LayoutServerLoad } from "./$types";
import dicebear from "$lib/api.dicebear";
import type { Employee } from "$lib/types";

export const load = (async () => {
  // Sample data
  const data: Employee = {
    id: 1,
    first_name: "Juan",
    middle_name: null,
    last_name: "Dela Cruz",
    email: "juan.delacruz@infinetsolutionsph.com",
    avatar_url: null,
  };

  if (!data.avatar_url) {
    data.avatar_url = await dicebear.getEmployeeAvatar(data);
  }

  return data;
}) satisfies LayoutServerLoad;
