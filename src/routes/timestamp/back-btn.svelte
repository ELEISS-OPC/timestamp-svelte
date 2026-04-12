<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$components/ui/button";
  import { cn } from "$utils";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";

  const desktopControlsStyle =
    "absolute bottom-5 z-20 inline-flex hidden md:inline-flex";
  const mobileControlsStyle =
    "absolute bottom-10 z-20 inline-flex rounded-full w-16 h-16 text-4xl md:hidden";

  function goBack() {
    goto("/dashboard"); // navigate back to dashboard
  }
</script>

<!-- Desktop Button -->
<Button class={cn(desktopControlsStyle, "left-5")} onclick={goBack}>
  <ArrowLeft class="w-8 h-8" size={32} />
  Back
</Button>

<!-- Mobile Button -->
<Button class={cn(mobileControlsStyle, "left-5 bg-muted/20")} onclick={goBack}>
  <ArrowLeft class="w-8 h-8" size={32} />
</Button>
