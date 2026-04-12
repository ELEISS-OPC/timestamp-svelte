import API from "$lib/api.backend";
import errors from "$lib/errors";
import { redirect } from "@sveltejs/kit";
import { message, setError, superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { formSchema } from "./schema";
import { TimestampStatus } from "$lib/enums";

export const load: PageServerLoad = async ({ locals, cookies }) => {
  const access_token = cookies.get("auth_token") || "";

  try {
    const data = await API.timestamp_status(access_token, locals.user.id);
    return {
      user: locals.user,
      form: await superValidate(zod4(formSchema)),
      user_timestamp_status: data.status as TimestampStatus,
    };
  } catch (err) {
    if (err instanceof errors.UnauthorizedError) {
      return redirect(303, "/logout");
    }

    throw err;
  }
};

export const actions: Actions = {
  time_in: async (event) => {
    const form = await superValidate(event, zod4(formSchema));
    const { cookies } = event;
    const access_token: string = cookies.get("auth_token") || "";
    if (!form.valid)
      return message(form, "Please correct the errors in the form.", {
        status: 400,
      });

    try {
      const imageUploadResponse = await API.upload_image_base64(
        access_token,
        form.data.selfie,
      );
      const timeInResponse = await API.time_in(access_token, {
        user_id: form.data.user_id,
        latitude: form.data.latitude,
        longitude: form.data.longitude,
        selfie: imageUploadResponse.original,
        selfie_preview: imageUploadResponse.preview,
      });

      return { form, timeInResponse };
    } catch (err) {
      if (err instanceof errors.AlreadyTimedInError) {
        return message(form, "You have already timed in for today.", {
          status: 400,
        });
      }
      if (err instanceof errors.InvalidImageError) {
        return setError(form, "selfie", err.message, { status: 400 });
      }
      if (err instanceof errors.BadRequestError) {
        return message(form, "The data provided is invalid.", { status: 400 });
      }
      if (err instanceof errors.UnauthorizedError) {
        return redirect(303, "/logout");
      }
      if (err instanceof errors.ServerError) {
        return message(
          form,
          "Our servers are having a moment. Please try again later.",
          {
            status: 500,
          },
        );
      }

      console.error("Unexpected error during time in:", err);

      return message(
        form,
        "An unexpected error occurred.",
        {
          status: 500,
        },
      );
    }
  },
  time_out: async (event) => {
    const form = await superValidate(event, zod4(formSchema));
    const { cookies } = event;
    const access_token: string = cookies.get("auth_token") || "";
    if (!form.valid)
      return message(form, "Please correct the errors in the form.", {
        status: 400,
      });

    try {
      const imageUploadResponse = await API.upload_image_base64(
        access_token,
        form.data.selfie,
      );
      const timeOutResponse = await API.time_out(access_token, {
        user_id: form.data.user_id,
        latitude: form.data.latitude,
        longitude: form.data.longitude,
        selfie: imageUploadResponse.original,
        selfie_preview: imageUploadResponse.preview,
      });

      return { form, timeOutResponse };
    } catch (err) {
      if (err instanceof errors.AlreadyTimedOutError) {
        return message(form, "You have already timed out for today.", {
          status: 400,
        });
      }
      if (err instanceof errors.InvalidImageError) {
        return setError(form, "selfie", err.message, { status: 400 });
      }
      if (err instanceof errors.BadRequestError) {
        return message(form, "The data provided is invalid.", { status: 400 });
      }
      if (err instanceof errors.UnauthorizedError) {
        return redirect(303, "/logout");
      }
      if (err instanceof errors.ServerError) {
        return message(
          form,
          "Our servers are having a moment. Please try again later.",
          {
            status: 500,
          },
        );
      }

      console.error("Unexpected error during time out:", err);


      return message(
        form,
        "An unexpected error occurred.",
        {
          status: 500,
        },
      );
    }
  },
};
