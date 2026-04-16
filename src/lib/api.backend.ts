import { urlJoin } from "$utils";
import STATUS from "$lib/status";
import { BACKEND_URL } from "$env/static/private";
import errors from "$lib/errors";
import type { AttendanceView } from "$lib/types";

/**
 * Authenticate a user and retrieve an access token.
 *
 * This function sends login credentials using `FormData`,
 * which is required for OAuth2-compatible endpoints
 * (e.g. FastAPI's OAuth2PasswordRequestForm).
 *
 * @param formdata - FormData containing:
 *   - `email`: string
 *   - `password`: string
 *
 * @returns A promise that resolves to the authentication response
 * containing the `access_token` and `token_type`.
 *
 */
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ access_token: string; token_type: string }> {
  const formdata = new FormData();
  formdata.append("username", email);
  formdata.append("password", password);

  const response = await fetch(urlJoin(BACKEND_URL, "/auth/token/"), {
    method: "POST",
    body: formdata,
  });

  // 1. Handle HTTP errors explicitly
  if (!response.ok) {
    const status = response.status;
    console.error(`Login failed with status: ${status}`);
    switch (status) {
      case STATUS.HTTP_401_UNAUTHORIZED:
        throw new errors.InvalidCredentialsError(
          "The password provided is incorrect.",
          STATUS.HTTP_401_UNAUTHORIZED,
        );
      case STATUS.HTTP_404_NOT_FOUND:
        throw new errors.UserNotFoundError(
          "A user with this email does not exist.",
          STATUS.HTTP_404_NOT_FOUND,
        );
      case STATUS.HTTP_500_INTERNAL_SERVER_ERROR:
        throw new errors.ServerError(
          "Something went wrong on the server.",
          STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
        );
      default:
        throw new Error(`Login failed with status: ${status}`);
    }
  }

  return await response.json();
}

export async function get_my_info(token: string) {
  const response = await fetch(urlJoin(BACKEND_URL, "/user/me/"), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    switch (response.status) {
      case STATUS.HTTP_401_UNAUTHORIZED:
        throw new errors.UnauthorizedError(
          "You are not authorized to access this resource.",
          STATUS.HTTP_401_UNAUTHORIZED,
        );
      case STATUS.HTTP_404_NOT_FOUND:
        throw new errors.UserNotFoundError(
          "User information could not be found.",
          STATUS.HTTP_404_NOT_FOUND,
        );
      case STATUS.HTTP_500_INTERNAL_SERVER_ERROR:
        throw new errors.ServerError(
          "Something went wrong on the server.",
          STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
        );
      default:
        throw new Error(
          `Failed to fetch user info with status: ${response.status}`,
        );
    }
  }

  return await response.json();
}

export async function upload_image_base64(token: string, imageData: string) {
  const response = await fetch(urlJoin(BACKEND_URL, "/image/base64"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: imageData }),
  });

  if (!response.ok) {
    switch (response.status) {
      case STATUS.HTTP_400_BAD_REQUEST:
        throw new errors.BadRequestError(
          "The image data provided is invalid.",
          STATUS.HTTP_400_BAD_REQUEST,
        );
      case STATUS.HTTP_401_UNAUTHORIZED:
        throw new errors.UnauthorizedError(
          "You are not authorized to perform this action.",
          STATUS.HTTP_401_UNAUTHORIZED,
        );

      case STATUS.HTTP_413_CONTENT_TOO_LARGE:
        throw new errors.ImageTooLargeError(
          "The image data provided is too large.",
          STATUS.HTTP_413_CONTENT_TOO_LARGE,
        );
      case STATUS.HTTP_422_UNPROCESSABLE_CONTENT:
        console.log(response);
        throw new errors.UnprocessableContentError(
          "The image data could not be processed.",
          STATUS.HTTP_422_UNPROCESSABLE_CONTENT,
        );
      case STATUS.HTTP_500_INTERNAL_SERVER_ERROR:
        throw new errors.ServerError(
          "Something went wrong on the server.",
          STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
        );
      default:
        throw new Error(
          `Failed to upload image with status: ${response.status}`,
        );
    }
  }

  return await response.json();
}

export async function timestamp_status(token: string, user_id: number) {
  const response = await fetch(
    urlJoin(BACKEND_URL, `/timestamp/current-status/${user_id}`),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    switch (response.status) {
      case STATUS.HTTP_401_UNAUTHORIZED:
        throw new errors.UnauthorizedError(
          "You are not authorized to access this resource.",
          STATUS.HTTP_401_UNAUTHORIZED,
        );
      case STATUS.HTTP_404_NOT_FOUND:
        throw new errors.UserNotFoundError(
          "User information could not be found.",
          STATUS.HTTP_404_NOT_FOUND,
        );
      case STATUS.HTTP_500_INTERNAL_SERVER_ERROR:
        throw new errors.ServerError(
          "Something went wrong on the server.",
          STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
        );
      default:
        throw new Error(
          `Failed to fetch timestamp status with status: ${response.status}`,
        );
    }
  }

  return await response.json();
}

export async function time_in(
  token: string,
  data: {
    user_id: number;
    latitude: number;
    longitude: number;
    selfie: string;
    selfie_preview: string;
  },
) {
  const response = await fetch(urlJoin(BACKEND_URL, "/timestamp/time-in"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: data.user_id,
      coordinates: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      selfie: data.selfie, // URL from the image upload response
      selfie_preview: data.selfie_preview, // URL from the image upload response
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    switch (response.status) {
      case STATUS.HTTP_400_BAD_REQUEST:
        if ((data.detail as string).includes("already timed in")) {
          throw new errors.AlreadyTimedInError(
            "You have already timed in for today.",
            STATUS.HTTP_400_BAD_REQUEST,
          );
        }
        throw new errors.BadRequestError(
          "Something is wrong with this request.",
          STATUS.HTTP_400_BAD_REQUEST,
        );
      case STATUS.HTTP_401_UNAUTHORIZED:
        throw new errors.UnauthorizedError(
          "You are not authorized to perform this action.",
          STATUS.HTTP_401_UNAUTHORIZED,
        );
      case STATUS.HTTP_500_INTERNAL_SERVER_ERROR:
        throw new errors.ServerError(
          "Something went wrong on the server.",
          STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
        );
      default:
        throw new Error(`Failed to time in with status: ${response.status}`);
    }
  }

  return await response.json();
}

export async function time_out(
  token: string,
  data: {
    user_id: number;
    latitude: number;
    longitude: number;
    selfie: string;
    selfie_preview: string;
  },
) {
  const response = await fetch(urlJoin(BACKEND_URL, "/timestamp/time-out"), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: data.user_id,
      coordinates: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      selfie: data.selfie, // URL from the image upload response
      selfie_preview: data.selfie_preview, // URL from the image upload response
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    switch (response.status) {
      case STATUS.HTTP_400_BAD_REQUEST:
        if ((data.detail as string).includes("already timed out")) {
          throw new errors.AlreadyTimedOutError(
            "You have already timed out or have not timed in yet for today.",
            STATUS.HTTP_400_BAD_REQUEST,
          );
        }
        throw new errors.BadRequestError(
          "Something is wrong with this request.",
          STATUS.HTTP_400_BAD_REQUEST,
        );
      case STATUS.HTTP_401_UNAUTHORIZED:
        throw new errors.UnauthorizedError(
          "You are not authorized to perform this action.",
          STATUS.HTTP_401_UNAUTHORIZED,
        );
      case STATUS.HTTP_500_INTERNAL_SERVER_ERROR:
        throw new errors.ServerError(
          "Something went wrong on the server.",
          STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
        );
      default:
        throw new Error(`Failed to time out with status: ${response.status}`);
    }
  }

  return await response.json();
}

export function get_all_timestamps(
  token: string,
  records: AttendanceView = "today",
) {
  let route;

  switch (records) {
    case "today":
      route = "/timestamp/all-records/today";
      break;
    case "yesterday":
      route = "/timestamp/all-records/yesterday";
      break;
    case "history":
    default:
      route = "/timestamp/all-records";
      break;
  }

  return fetch(urlJoin(BACKEND_URL, route), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      switch (response.status) {
        case STATUS.HTTP_401_UNAUTHORIZED:
          throw new errors.UnauthorizedError(
            "You are not authorized to access this resource.",
            STATUS.HTTP_401_UNAUTHORIZED,
          );

        case STATUS.HTTP_500_INTERNAL_SERVER_ERROR:
          throw new errors.ServerError(
            "Something went wrong on the server.",
            STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
          );
        default:
          throw new Error(
            `Failed to fetch timestamps with status: ${response.status}`,
          );
      }
    }
    return response.json();
  });
}

export function get_all_employees(token: string) {
  return fetch(urlJoin(BACKEND_URL, "/user/all"), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      switch (response.status) {
        case STATUS.HTTP_401_UNAUTHORIZED:
          throw new errors.UnauthorizedError(
            "You are not authorized to access this resource.",
            STATUS.HTTP_401_UNAUTHORIZED,
          );

        case STATUS.HTTP_500_INTERNAL_SERVER_ERROR:
          throw new errors.ServerError(
            "Something went wrong on the server.",
            STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
          );
        default:
          throw new Error(
            `Failed to fetch employees with status: ${response.status}`,
          );
      }
    }
    return response.json();
  });
}

export function create_employee(
  token: string,
  data: {
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    email: string;
    password: string;
    role_id: number;
  },
) {
  return fetch(urlJoin(BACKEND_URL, "/user"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      switch (response.status) {
        case STATUS.HTTP_400_BAD_REQUEST:
          throw new errors.BadRequestError(
            "Something is wrong with this request.",
            STATUS.HTTP_400_BAD_REQUEST,
          );
        case STATUS.HTTP_401_UNAUTHORIZED:
          throw new errors.UnauthorizedError(
            "You are not authorized to perform this action.",
            STATUS.HTTP_401_UNAUTHORIZED,
          );
        case STATUS.HTTP_409_CONFLICT:
          throw new errors.UserAlreadyExistsError(
            "A user with the provided email already exists.",
            STATUS.HTTP_409_CONFLICT,
          );
        case STATUS.HTTP_500_INTERNAL_SERVER_ERROR:
          throw new errors.ServerError(
            "Something went wrong on the server.",
            STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
          );
        default:
          throw new Error(
            `Failed to create employee with status: ${response.status}`,
          );
      }
    }
    return response.json();
  });
}

const API = {
  login,
  get_my_info,
  upload_image_base64,
  time_in,
  time_out,
  timestamp_status,
  get_all_timestamps,
  get_all_employees,
  create_employee,
};

export default API;
