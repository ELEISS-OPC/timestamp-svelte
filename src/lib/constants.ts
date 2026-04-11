export const PROTECTED_ROUTES = ["/dashboard", "/timestamp"] as const;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/avif",
  "image/webp",
];

export const USER_COOKIE_FIELDS = [
  "id",
  "first_name",
  "middle_name",
  "last_name",
  "email",
  "role_id",
  "avatar_url",
  "avatar_url_preview",
];

export const OPTIONAL_USER_COOKIE_FIELDS = [
  "middle_name",
  "avatar_url",
  "avatar_url_preview",
];

export const destructiveSonnerStyle =
  "--normal-bg: color-mix(in oklab, var(--destructive) 10%, var(--background)); --normal-text: var(--destructive); --normal-border: var(--destructive)";

export const successSonnerStyle =
  "--normal-bg: color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background)); --normal-text: light-dark(var(--color-green-600), var(--color-green-400)); --normal-border: light-dark(var(--color-green-600), var(--color-green-400))";

export const warningSonnerStyle =
  "--normal-bg: color-mix(in oklab, light-dark(var(--color-yellow-600), var(--color-yellow-400)) 10%, var(--background)); --normal-text: light-dark(var(--color-yellow-600), var(--color-yellow-400)); --normal-border: light-dark(var(--color-yellow-600), var(--color-yellow-400))";

export const SonnerStyle = {
  destructive: destructiveSonnerStyle,
  success: successSonnerStyle,
  warning: warningSonnerStyle,
} as const;
