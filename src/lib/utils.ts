import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { OPTIONAL_USER_COOKIE_FIELDS, USER_COOKIE_FIELDS } from "./constants";
import type { Employee, CookieOptions } from "./types";
import { type Cookies } from "@sveltejs/kit";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, "children">
  : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};

export function urlJoin(...parts: string[]) {
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part.replace(/\/+$/g, ""); // Remove trailing slashes from the first part
      } else {
        return part.replace(/^\/+|\/+$/g, ""); // Remove leading and trailing slashes from other parts
      }
    })
    .filter((part) => part.length > 0) // Remove empty parts
    .join("/");
}

export const setCookie = (
  cookies: Cookies,
  name: string,
  value: string,
  options: CookieOptions = {},
) => {
  const cookieOptions = {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  } as const;

  cookies.set(name, value, { ...cookieOptions, ...options });
};

export const optionalSetCookie = (
  cookies: Cookies,
  name: string,
  value: string | null,
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