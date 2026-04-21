<script lang="ts">
  import { Button } from "$components/ui/button";
  import { cn } from "$utils";
  import { Trash2 } from "@lucide/svelte/icons";

  let {
    retake,
    desktopControlsStyle = "hidden md:inline-flex",
    mobileControlsStyle = "inline-flex rounded-full w-16 h-16 text-4xl md:hidden",
  }: {
    retake: () => void;
    desktopControlsStyle?: string;
    mobileControlsStyle?: string;
  } = $props();
</script>

<!-- Desktop Version-->
<Button
  variant="outline"
  class={cn(desktopControlsStyle, "left-5")}
  onclick={retake}
  type="button"
>
  <Trash2 class="w-4 h-4" />
  Take another photo
</Button>

<!-- Mobile Version  -->
<Button
variant="outline"
class={cn(mobileControlsStyle, "right-1/2 translate-x-[-150%]")}
onclick={retake}
type="button"
><Trash2 class="w-4 h-4" />
</Button>