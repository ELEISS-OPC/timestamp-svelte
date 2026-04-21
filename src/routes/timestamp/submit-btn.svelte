<script lang="ts">
  import { Button } from "$components/ui/button";
  import { cn } from "$utils";
  import { SendHorizontal } from "@lucide/svelte/icons";

  let {
    action,
    desktopControlsStyle = "hidden md:inline-flex",
    mobileControlsStyle = "inline-flex rounded-full w-16 h-16 text-4xl md:hidden",
  }: {
    action: string;
    desktopControlsStyle?: string;
    mobileControlsStyle?: string;
  } = $props();
</script>

<Button
  class={cn(desktopControlsStyle, "right-5")}
  type="submit"
  formaction={action}
>
  <SendHorizontal class="w-4 h-4" />
  Submit
</Button>
<Button
  class={cn(mobileControlsStyle, "left-1/2 translate-x-[150%]")}
  type="submit"
  formaction={action}
>
  <SendHorizontal class="w-4 h-4" />
</Button>
