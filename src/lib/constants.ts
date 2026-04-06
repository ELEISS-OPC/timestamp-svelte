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
