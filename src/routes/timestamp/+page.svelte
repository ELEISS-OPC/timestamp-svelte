<script lang="ts">
  import { onMount } from "svelte";
  import { Button } from "$components/ui/button";
  import { Camera, Trash2, SendHorizontal } from "@lucide/svelte/icons";
  import { cn } from "$utils";
  import { GetLocationWithAddress } from "$lib/geolocation";

  // Camera capture
  let video: HTMLVideoElement;
  let stream: MediaStream;
  let canvas: HTMLCanvasElement;
  let showCanvas = $state(false); // track if a capture has been taken

  // Time display
  let time = $state(new Date());
  const timeZone = "Asia/Manila";

  // Geolocation
  let latitude: number | null = $state(null);
  let longitude: number | null = $state(null);
  let address: string | null = $state(null);
  let error: string | null = $state(null);

  // UI styles
  const desktopControlsStyle = "absolute bottom-5 z-20 inline-flex hidden md:inline-flex";
  const mobileControlsStyle =
    "absolute bottom-10 z-20 inline-flex rounded-full w-16 h-16 text-4xl md:hidden";

  onMount(() => {

    // Update time every second
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);


    // Access camera and stream to video element
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    })();


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
      stream?.getTracks().forEach((track) => track.stop());
    };
  });

  const formatTime = (value: Date) =>
    value.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: timeZone,
    });

  function capture() {
    // set canvas pixel dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    showCanvas = true; // show captured canvas
  }

  function removeCanvas() {
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height); // clear previous capture
    showCanvas = false;
  }
</script>

<div class="relative w-screen h-dvh bg-gray-100 overflow-hidden">
  <!-- Video fills the screen -->
  <video
    bind:this={video}
    autoplay
    playsinline
    class="absolute top-0 left-0 w-screen h-screen object-cover"
  ></video>

  <!-- Time overlay -->
  <div
    class="absolute left-3 top-3 rounded-md bg-black/70 px-3 py-1 font-mono text-sm text-white"
  >
    {formatTime(time)} - {timeZone}
  </div>

  <!-- Geolocation overlay -->
  {#if latitude !== null && longitude !== null}
    <div
      class="absolute left-3 top-12 rounded-md max-w-xs bg-black/70 px-3 py-1 font-mono text-sm text-white"
    >
      {address} ({latitude.toFixed(6)}, {longitude.toFixed(6)})
    </div>
  {/if}

  <!-- Capture / retake button -->
  {#if !showCanvas}
    <!-- Desktop capture button -->
    <Button class={cn(desktopControlsStyle, "right-5")} onclick={capture}>
      <Camera class="w-8 h-8" size={32} />

      Time in
    </Button>

    <!-- Mobile capture button -->
    <Button
      class={cn(mobileControlsStyle, "translate-x-1/2 right-1/2")}
      onclick={capture}
    >
      <Camera class="w-8 h-8" />
    </Button>
  {:else}
    <!-- Desktop Controls -->
    <Button
      variant="outline"
      class={cn(desktopControlsStyle, "left-5")}
      onclick={removeCanvas}
    >
      <Trash2 class="w-4 h-4" />
      Take another photo
    </Button>
    <Button class={cn(desktopControlsStyle, "right-5")} onclick={removeCanvas}>
      <SendHorizontal class="w-4 h-4" />
      Submit
    </Button>

    <!-- Mobile Controls -->
    <Button
      variant="outline"
      class={cn(mobileControlsStyle, "right-1/2 translate-x-[-150%]")}
      onclick={removeCanvas}
    >
      <Trash2 class="w-4 h-4" />
    </Button>
    <Button class={cn(mobileControlsStyle, "left-1/2 translate-x-[150%]")}>
      <SendHorizontal class="w-4 h-4" />
    </Button>
  {/if}

  <!-- Canvas overlay -->
  <canvas
    bind:this={canvas}
    class="absolute top-1/2 left-1/2 z-10 translate-x-[-50%] translate-y-[-50%] w-screen h-screen object-cover"
  ></canvas>
</div>
