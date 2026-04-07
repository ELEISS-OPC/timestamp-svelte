export type Employee = {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  role_id: number;
  avatar_url: string | null;
  avatar_url_preview: string | null;
};

export interface dicebearOptions {
  scale?: number;
  style?: string;
}

export type CookieOptions = {
  path?: string;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
  maxAge?: number;
  expires?: Date;
};
