<script lang="ts">
  import { cn } from "$utils";
  import type { Snippet } from "svelte";
  let {
    children,
    class: className,
    location = "bottom",
    distance = 5,
  }: {
    children: Snippet;
    class?: string;
    location?: "top" | "bottom" | "left" | "right";
    distance?: number;
  } = $props();
</script>

<div
  class={cn(
    "h-fit w-full absolute px-10 flex items-center space-between",
    className,
    `${location}-${distance}`,
  )}
>
  {@render children()}
</div>
