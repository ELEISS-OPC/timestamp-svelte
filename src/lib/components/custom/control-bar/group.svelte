<script lang="ts">
  import { cn } from "$utils";
  import type { Snippet } from "svelte";
  let {
    children,
    class: className = "",
    orientation = "horizontal",
  }: {
    children: Snippet;
    class?: string;
    orientation?: "horizontal" | "vertical";
  } = $props();
</script>

<div
  class={cn(
    "flex w-full items-center",
    orientation === "vertical" ? "flex-col" : "flex-row",
    className,
  )}
>
  {@render children()}
</div>
