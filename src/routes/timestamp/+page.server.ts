import API from "$lib/api.backend";
import errors from "$lib/errors";
import { removeDataURIBase64Prefix } from "$utils";
import { fail, redirect } from "@sveltejs/kit";
import { message, setError, superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { formSchema } from "./schema";

export const load: PageServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
    form: await superValidate(zod4(formSchema)),
  };
};

export const actions: Actions = {
  time_in: async (event) => {
    console.log("Time In action triggered");
    const form = await superValidate(event, zod4(formSchema));
    const { cookies } = event;
    const access_token: string = cookies.get("auth_token")!;
    if (!form.valid) return fail(400, { form });

    try {
      const imageUploadResponse = await API.upload_image_base64(
        access_token,
        removeDataURIBase64Prefix(form.data.selfie),
      );
      const timeInResponse = await API.time_in(access_token, {
        user_id: form.data.user_id,
        latitude: form.data.latitude,
        longitude: form.data.longitude,
        selfie: imageUploadResponse.image_url,
        selfie_preview: imageUploadResponse.preview_url,
      });

      return timeInResponse.time_in; // Return the time_in timestamp
    } catch (err) {
      console.error("Image upload failed:", err);
      console.error("Image upload failed:");

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

      console.error("Unexpected Image Upload Error:", err);
      return message(
        form,
        "An unexpected error occurred during image upload.",
        {
          status: 500,
        },
      );
    }
  },
};
