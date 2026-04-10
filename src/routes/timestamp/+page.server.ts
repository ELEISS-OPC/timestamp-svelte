import type { PageServerLoad, Actions } from "./$types";
import API, { time_in } from "$lib/api.backend";
import { message, setError, superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
import { fail, isRedirect } from "@sveltejs/kit";

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
    const access_token: string = cookies.get("access_token")!;
    if (!form.valid) return fail(400, { form });

    const imageUploadResponse = await API.upload_image_base64(
      access_token,
      form.data.selfie,
    );
    const timeInResponse = await API.time_in(access_token, {
      user_id: form.data.user_id,
      latitude: form.data.latitude,
      longitude: form.data.longitude,
      selfie: imageUploadResponse.image_url,
      selfie_preview: imageUploadResponse.preview_url,
    });
  },
};
