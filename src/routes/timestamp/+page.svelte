<script lang="ts">
  import { onMount } from "svelte";
  import { Button } from "$components/ui/button";
  import { Camera, Trash2, SendHorizontal } from "@lucide/svelte/icons";
  import { cn } from "$utils";
  import { GetLocationWithAddress } from "$lib/geolocation";
  import { goto } from "$app/navigation";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import EasyCamera from "@cloudparker/easy-camera-svelte";
  import type { Employee } from "$lib/types";
  import {
    type Infer,
    superForm,
    type SuperValidated,
  } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { formSchema, type FormSchema } from "./schema";

  let {
    data,
  }: { data: { user: Employee; form: SuperValidated<Infer<FormSchema>> } } =
    $props();

  // Camera capture
  let width = $state(0); // capture full screen width
  let camera: EasyCamera;
  let mirrorDisplay = $state(true); // mirror video for user-friendly selfie view
  let capturedImage: string = $state(""); // base64 string of captured image

  // Time display
  let time = $state(new Date());
  const timeZone = "Asia/Manila";

  // Geolocation
  let latitude: number | null = $state(0);
  let longitude: number | null = $state(0);
  let address: string | null = $state("");
  let error: string | null = $state(null);

  // UI styles
  const desktopControlsStyle =
    "absolute bottom-5 z-20 inline-flex hidden md:inline-flex";
  const mobileControlsStyle =
    "absolute bottom-10 z-20 inline-flex rounded-full w-16 h-16 text-4xl md:hidden";

  function handleResize() {
    if (window) {
      width = window.innerWidth;
    }
  }

  onMount(() => {
    // Update time every second
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    // Handle window resize to update camera width
    width = window.innerWidth || 0;
    window.addEventListener("resize", handleResize);

    // Get geolocation
    (async () => {
      try {
        const location = await GetLocationWithAddress();
        latitude = location.latitude;
        longitude = location.longitude;
        address = location.address;
      } catch (err) {
        error = "Unable to retrieve location.";
        console.error("Geolocation error:", err);
      }
    })();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  });

  const formatTime = (value: Date) =>
    value.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: timeZone,
    });

  const capture = async () => {
    let imageData = (await camera.captureImage()) as string; // capture image as base64 string
    capturedImage = imageData;
  };

  const retake = () => {
    capturedImage = "";
  };

  function goBack() {
    goto("/dashboard"); // navigate back to dashboard
  }

  // svelte-ignore state_referenced_locally
  const form = superForm(data.form, {
    validators: zod4Client(formSchema),
    onResult: retake, // reset captured image after successful submission
  });
  const { enhance, errors } = form;
</script>

<div class="relative w-screen h-dvh bg-gray-100 overflow-hidden">
  <!-- Video fills the screen -->
  <EasyCamera
    bind:width
    style="inset:0;"
    bind:this={camera}
    autoOpen
    bind:mirrorDisplay
    useAudio={false}
  />

  <!-- Time overlay -->
  <div
    class="absolute left-3 top-3 rounded-md bg-black/70 px-3 py-1 font-mono text-sm text-white"
  >
    {formatTime(time)} - {timeZone}
  </div>

  <!-- Back button -->
  <Button class={cn(desktopControlsStyle, "left-5")} onclick={goBack}>
    <ArrowLeft class="w-8 h-8" size={32} />
    Back
  </Button>

  <!-- Geolocation overlay -->
  {#if latitude !== null && longitude !== null}
    <div
      class="absolute left-3 top-12 rounded-md max-w-xs bg-black/70 px-3 py-1 font-mono text-sm text-white"
    >
      {address} ({latitude.toFixed(6)}, {longitude.toFixed(6)})
    </div>
  {/if}

  <!-- Capture / retake button -->
  {#if !capturedImage}
    <!-- Desktop capture button -->
    <Button
      class={cn(desktopControlsStyle, "right-5")}
      onclick={capture}
      type="button"
    >
      <Camera class="w-8 h-8" size={32} />
      Time in
    </Button>

    <!-- Mobile capture button -->
    <Button
      class={cn(mobileControlsStyle, "translate-x-1/2 right-1/2")}
      onclick={capture}
      type="button"
    >
      <Camera class="w-8 h-8" />
    </Button>
  {:else}
    <form method="POST" use:enhance action="?/time_in">
      <input type="hidden" name="user_id" value={data.user.id} />
      <input type="hidden" name="latitude" bind:value={latitude} />
      <input type="hidden" name="longitude" bind:value={longitude} />
      <input type="hidden" name="selfie" bind:value={capturedImage} />
      <!-- Desktop Controls -->
      <Button
        variant="outline"
        class={cn(desktopControlsStyle, "left-5")}
        onclick={retake}
        type="button"
      >
        <Trash2 class="w-4 h-4" />
        Take another photo
      </Button>
      <Button class={cn(desktopControlsStyle, "right-5")} type="submit">
        <SendHorizontal class="w-4 h-4" />
        Submit
      </Button>

      <!-- Mobile Controls -->
      <Button
        variant="outline"
        class={cn(mobileControlsStyle, "right-1/2 translate-x-[-150%]")}
        onclick={retake}
        type="button"
        ><Trash2 class="w-4 h-4" />
      </Button>
      <Button
        class={cn(mobileControlsStyle, "left-1/2 translate-x-[150%]")}
        type="submit"
      >
        <SendHorizontal class="w-4 h-4" />
      </Button>
    </form>
  {/if}

  <!-- Captured image overlay
  {#if capturedImage}
    <div class="absolute inset-0 z-10">
      <img
        src={capturedImage}
        alt="Captured reference"
        class="w-full h-full object-cover"
      />
    </div>
  {/if} -->

  <!-- {@render errMessage($errors.selfie)} -->
  <!-- {@render errMessage($errors.latitude)} -->
  <!-- {@render errMessage($errors.longitude)} -->
  {@render errMessage("Test")}

</div>

{#snippet errMessage(message: string)}
  {#if message}
    <div class="rounded-md bg-red-500 p-4 absolute z-30 w-20 h-20">
      <div class="flex">
        <div class="ml-3">
          <p class="text-sm font-medium text-red-800">{message}</p>
        </div>
      </div>
    </div>
  {/if}
{/snippet}
