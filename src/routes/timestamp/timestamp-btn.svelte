<script lang="ts">
  import { Button } from "$components/ui/button";
  import { Camera } from "@lucide/svelte/icons";
  import { cn } from "$utils";
  import type { Snippet } from "svelte";

  let {
    children,
    capture,
    desktopControlsStyle = "absolute bottom-5 z-20 inline-flex hidden md:inline-flex",
    mobileControlsStyle = "absolute bottom-10 z-20 inline-flex rounded-full w-16 h-16 text-4xl md:hidden",
  }: {
    children?: Snippet;
    capture: () => void;
    desktopControlsStyle?: string;
    mobileControlsStyle?: string;
  } = $props();
</script>

<!-- Desktop capture button -->
<Button
  class={cn(desktopControlsStyle, "right-5")}
  onclick={capture}
  type="button"
>
  <Camera class="w-8 h-8" size={32} />
  {#if children}
    {@render children()}
  {/if}
</Button>

<!-- Mobile capture button -->
<Button
  class={cn(mobileControlsStyle, "translate-x-1/2 right-1/2")}
  onclick={capture}
  type="button"
>
  <Camera class="w-8 h-8" />
</Button>
