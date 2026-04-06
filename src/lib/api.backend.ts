import { urlJoin } from "$lib/utils";
import STATUS from "$lib/status";
import { BACKEND_URL } from "$env/static/private";
import errors from "$lib/errors";

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

const API = {
  login,
  get_my_info,
};

export default API;
