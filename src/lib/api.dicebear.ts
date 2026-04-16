import type { Employee, dicebearOptions } from "$lib/types";

export async function getAvatarUrl(
  seed: string,
  options: dicebearOptions = { scale: 80, style: "fun-emoji" },
): Promise<string> {
  const { scale = 80, style = "initials" } = options;
  return `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&scale=${scale}`;
}

function formatEmployeeToSeed(
  employee: Employee,
): string {
  const { first_name, middle_name, last_name } = employee;
  return [first_name, middle_name, last_name]
    .join(" ")
    .trim()
    .replace(/\s+/g, "+");
}

export async function getEmployeeAvatar(
  employee: Employee,
  options: dicebearOptions = { scale: 80, style: "fun-emoji" },
): Promise<string> {
  const seed = formatEmployeeToSeed(employee);
  return getAvatarUrl(seed, options);
}

export default {
  getAvatarUrl,
  getEmployeeAvatar,
};
