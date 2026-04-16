<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { EyeIcon, EyeOffIcon } from "@lucide/svelte";

  let { value , id, name, required } = $props();

  let passwordVisible = $state(false);
</script>

<div class="relative">
  <Input {id} {name} {required} type={passwordVisible ? "text" : "password"} bind:value={value} />
  <Button
    variant="ghost"
    size="icon"
    onclick={() => (passwordVisible = !passwordVisible)}
    class="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
  >
    {#if passwordVisible}
      <EyeOffIcon />
    {:else}
      <EyeIcon />
    {/if}
    <span class="sr-only"
      >{passwordVisible ? "Hide password" : "Show password"}</span
    >
  </Button>
</div>
