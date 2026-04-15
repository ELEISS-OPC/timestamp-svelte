<script lang="ts">
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import favicon from "$lib/assets/favicon-32x32.png";
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import "./layout.css";
  import SlimProgressBar from "./slim-loading-bar.svelte";
  let { children } = $props();

  let bar: SlimProgressBar;

  beforeNavigate(() => {
    bar.start();
  });

  afterNavigate(() => {
    bar.finish();
  });
</script>

<svelte:head>
  <title>Timestamp</title>
  <meta
    name="description"
    content="EL & E InfiNet SolutionsPH Systems OPC's employee timekeeping system"
  />

  <link rel="icon" href={favicon} />
</svelte:head>
<Tooltip.Provider>
  <SlimProgressBar
    bind:this={bar}
    points={[15, 30, 55, 70, 90]}
    delay={180}
    className="bg-primary h-0.5"
  />

  <Toaster />
  {@render children()}
</Tooltip.Provider>
