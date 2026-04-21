<script lang="ts">
  import { Button } from "$components/ui/button";
  import { cn } from "$utils";
  import { UserIcon } from "@lucide/svelte";

const desktopControlsStyle =
  "hidden md:inline-flex";
 const mobileControlsStyle =
  "rounded-full w-16 h-16 text-4xl md:hidden";

</script>

<!-- Desktop Button -->
<Button class={cn(desktopControlsStyle, "")}>
  <UserIcon class="w-8 h-8" size={32} />
  Account
</Button>

<!-- Mobile Button -->
<Button class={cn(mobileControlsStyle, "bg-muted")}>
  <UserIcon class="w-8 h-8" size={32} />
</Button>
