<script lang="ts">
  import { GetLocationWithAddress } from "$lib/geolocation";
  import type { Employee } from "$lib/types";
  import { removeDataURIBase64Prefix } from "$utils";
  import EasyCamera from "@cloudparker/easy-camera-svelte";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import {
    type Infer,
    superForm,
    type SuperValidated,
  } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { formSchema, type FormSchema } from "./schema";
  import { TimestampStatus } from "$lib/enums";
  import { SonnerStyle } from "$lib/constants";

  import ImageOverlay from "./image-overlay.svelte";
  import InfoOverlay from "./info-overlay.svelte";
  import RetakeButton from "./retake-btn.svelte";
  import SubmitButton from "./submit-btn.svelte";
  import TimestampButton from "./timestamp-btn.svelte";
  import BackButton from "./back-btn.svelte";
  import { toTitleCase } from "layerchart/utils/string";
  import { getGreeting } from "$utils";

  let {
    data,
  }: {
    data: {
      user: Employee;
      form: SuperValidated<Infer<FormSchema>>;
      user_timestamp_status: TimestampStatus;
    };
  } = $props();

  // Is the user currently timed in or out?
  // This will determine the button text and API endpoint used.
  // Updated on mount and after each successful time in/out action.
  let isTimedIn = $state(false);

  let loadingSonnerID: string | number = $state("");
  const sonnerPlacement = "top-center";
  const successSonnerOptions = {
    position: sonnerPlacement,
    style: SonnerStyle.success,
  } as const;
  const errorSonnerOptions = {
    position: sonnerPlacement,
    style: SonnerStyle.destructive,
  } as const;

  // Camera capture
  let width = $state(0); // capture full screen width
  let camera: EasyCamera;

  // Time display
  let time = $state(new Date());

  // Geolocation
  let latitude: number = $state(0);
  let longitude: number = $state(0);
  let address: string = $state("");

  function handleResize() {
    if (window) {
      width = window.innerWidth;
    }
  }

  // svelte-ignore state_referenced_locally
  const {
    errors,
    form: formData,
    enhance,
    message,
  } = superForm(data.form, {
    validators: zod4Client(formSchema),
    onSubmit: () => {
      loadingSonnerID = toast.loading("Submitting...", {
        position: "top-center",
      });
    },
    onResult: ({ result }) => {
      if (result.type === "success") {
        toast.dismiss(loadingSonnerID);
        if (isTimedIn) {
          toast.success(
            getGreeting("timeOut", data.user.first_name),
            successSonnerOptions,
          );
        } else {
          toast.success(getGreeting("timeIn", data.user.first_name), successSonnerOptions);
        }
        isTimedIn = !isTimedIn;
      } else if (result.type === "error") {
        toast.error("Something went wrong timing you in.", errorSonnerOptions);
      }
    },
  });

  const retake = () => {
    $formData.selfie = "";
  };

  onMount(() => {
    // Update time every second
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    // Handle window resize to update camera width
    width = window.innerWidth || 0;
    window.addEventListener("resize", handleResize);

    // Set initial timestamp status
    isTimedIn = data.user_timestamp_status === TimestampStatus.TIMED_IN;

    // Get geolocation
    (async () => {
      try {
        const location = await GetLocationWithAddress();
        latitude = location.latitude;
        longitude = location.longitude;
        address = location.address;
      } catch (err) {
        toast.warning("Unable to retrieve location.", {
          position: "top-center",
          style: SonnerStyle.warning,
        });
      }
    })();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  });

  const capture = async () => {
    const imageData = (await camera.captureImage()) as string; // capture image as base64 string
    $formData.selfie = removeDataURIBase64Prefix(imageData);
    $formData.user_id = Number(data.user.id);
    $formData.latitude = latitude;
    $formData.longitude = longitude;
  };
</script>

<div class="relative w-screen h-dvh bg-gray-100 overflow-hidden">
  <EasyCamera
    bind:width
    style="inset:0;"
    bind:this={camera}
    autoOpen
    mirrorDisplay
    useAudio={false}
  />
  <InfoOverlay {time} {latitude} {longitude} {address} />
  <BackButton />

  {#if !$formData.selfie}
    <TimestampButton {capture}
      >{isTimedIn ? "Time Out" : "Time In"}</TimestampButton
    >
  {:else}
    <RetakeButton {retake} />
    <form method="post" use:enhance>
      <input type="hidden" name="user_id" bind:value={$formData.user_id} />
      <input type="hidden" name="latitude" bind:value={$formData.latitude} />
      <input type="hidden" name="longitude" bind:value={$formData.longitude} />
      <input type="hidden" name="selfie" bind:value={$formData.selfie} />
      <SubmitButton action={isTimedIn ? "?/time_out" : "?/time_in"} />
    </form>
  {/if}

  <!-- Captured image overlay -->
  {#if $formData.selfie}
    <ImageOverlay image={$formData.selfie} />
  {/if}

  <!-- Toast notifications -->
  {#if $message}
    {toast("Something went wrong.", {
      description: $message,
      ...errorSonnerOptions,
    })}
  {/if}
  {#if $errors.user_id}
    {toast.error("Invalid user ID.", {
      description: String($errors.user_id),
      ...errorSonnerOptions,
    })}
  {/if}
  {#if $errors.selfie}
    {toast.error("Invalid selfie.", {
      description: String($errors.selfie),
      ...errorSonnerOptions,
    })}
  {/if}

  {#if $errors.latitude || $errors.longitude}
    {toast.error("Invalid location.", {
      description: String($errors.latitude || $errors.longitude),
      ...errorSonnerOptions,
    })}
  {/if}
</div>
