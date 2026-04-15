import {
  OPTIONAL_USER_COOKIE_FIELDS,
  USER_COOKIE_FIELDS,
} from "$lib/constants";
import type { Employee } from "$lib/types";
import { type Cookies } from "@sveltejs/kit";

export type CookieOptions = {
  path?: string;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
  maxAge?: number;
  expires?: Date;
};

export const setCookie = (
  cookies: Cookies,
  name: string,
  value: string | number,
  options: CookieOptions = {},
) => {
  const cookieOptions = {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  } as const;

  cookies.set(name, String(value), { ...cookieOptions, ...options });
};

export const optionalSetCookie = (
  cookies: Cookies,
  name: string,
  value: string | number,
  options: CookieOptions = {},
) => {
  if (value) {
    setCookie(cookies, name, value, options);
  }
};

export const deleteCookie = (cookies: Cookies, name: string) => {
  cookies.delete(name, { path: "/" });
};

export const checkValidUserInfo = (userInfo: any) => {
  for (const field of USER_COOKIE_FIELDS) {
    if (OPTIONAL_USER_COOKIE_FIELDS.includes(field)) {
      continue; // skip optional fields
    }
    if (userInfo[field as keyof Employee] === undefined) {
      return false; // exit early if required field is missing
    }
  }
  return true;
};
