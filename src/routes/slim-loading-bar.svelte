<script lang="ts">
  import { onDestroy } from "svelte";
  import { cn } from "$utils";

  let {
    points = [10, 25, 40, 65, 85, 95],
    delay = 200,
    className = "",
  }: {
    points?: number[];
    delay?: number;
    className?: string;
  } = $props();

  let progress = $state(0);
  let active = $state(false);
  let timer: any;

  // Start animation
  export function start() {
    reset();
    active = true;

    let i = 0;

    timer = setInterval(() => {
      if (i < points.length) {
        progress = points[i];
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);
  }

  // Finish animation
  export function finish() {
    clearInterval(timer);
    progress = 100;

    // allow animation to reach 100 before hiding
    setTimeout(() => {
      active = false;
      progress = 0;
    }, 300);
  }

  function reset() {
    clearInterval(timer);
    progress = 0;
  }

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div
  class={cn(
    "fixed top-0 left-0 z-9999 transition-all duration-200 ease-out",
    className,
  )}
  class:opacity-100={active}
  class:opacity-0={!active}
  style="width: {progress}%"
></div>
