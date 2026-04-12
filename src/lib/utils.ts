import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { OPTIONAL_USER_COOKIE_FIELDS, USER_COOKIE_FIELDS } from "./constants";
import type { Employee, CookieOptions } from "./types";
import { type Cookies } from "@sveltejs/kit";
import { toTitleCase } from "layerchart/utils/string";

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

/**
 * Removes the metadata prefix from a data URI string and returns only the payload.
 *
 * Example input: "data:image/png;base64,iVBORw0KGgo..."
 * Example output: "iVBORw0KGgo..."
 *
 * If the input does not follow the expected data URI format, the original string is returned.
 */
export const removeDataURIBase64Prefix = (dataURI: string) => {
  const separator = "base64,";
  const data = dataURI.split(separator);
  return data.length > 1 ? data[1] : dataURI; // Return the base64 data or original if it doesn't have the expected format
};

export function getTimeCategory(
  date = new Date(),
): "morning" | "afternoon" | "night" {
  const hour = date.getHours();

  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "night";
}

const greetings = {
  timeIn: {
    morning: [
      "Good morning! Ready for a productive day?",
      "Let's get started—have a great morning!",
      (name: string) => `Good morning, ${name}! Let's make today count.`,
      (name: string) => `Morning, ${name}! Hope you have a productive day.`,
    ],
    afternoon: [
      "Good afternoon! Let's make the rest of the day count.",
      "Back at it—hope your day's going well!",
      (name: string) => `Good afternoon, ${name}! Let's keep it going.`,
      (name: string) => `Hey ${name}, let's finish strong today.`,
    ],
    night: [
      "Good evening! Let's wrap up the day strong.",
      "Evening shift—let's do this!",
      (name: string) => `Good evening, ${name}! Let's have a smooth shift.`,
      (name: string) => `Hey ${name}, let's make tonight productive.`,
    ],
  },

  timeOut: {
    morning: [
      "All done early—nice work!",
      "Great job this morning!",
      (name: string) => `Nice work this morning, ${name}!`,
      (name: string) => `Good job wrapping up early, ${name}!`,
    ],
    afternoon: [
      "That's a wrap—great job today!",
      "Good work today! Enjoy your afternoon.",
      (name: string) => `Nice job today, ${name}!`,
      (name: string) => `Great work today, ${name}! Enjoy your rest.`,
    ],
    night: [
      "Great job today—time to rest!",
      "All done for today. Take it easy!",
      (name: string) => `Good work today, ${name}! You've earned the rest.`,
      (name: string) => `That's a wrap, ${name}! Have a good night.`,
    ],
  },
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type GreetingType = "timeIn" | "timeOut";

export function getGreeting(
  type: GreetingType,
  name?: string,
  date = new Date(),
): string {
  const category = getTimeCategory(date);
  const pool = greetings[type][category];

  const item = pickRandom(pool);

  if (typeof item === "function") {
    return name ? item(toTitleCase(name)) : item("friend");
  }

  return item;
}

export const compressBase64Image = (
  base64: string,
  quality = 0.7,
  maxWidth = 1280,
  maxHeight = 1280,
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toDataURL("image/jpeg", quality); // compress here
      const compressed = canvas.toDataURL("image/jpeg", quality);

      resolve(compressed);
    };
  });
};
