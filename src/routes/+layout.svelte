<script lang="ts">
  import favicon from "$lib/assets/favicon-32x32.png";
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import "./layout.css";
  let { children } = $props();
</script>

<svelte:head>
  <title>Timestamp</title>
  <meta
    name="description"
    content="EL & E InfiNet SolutionsPH Systems OPC's employee timekeeping system"
  />

  <link rel="icon" href={favicon} /></svelte:head
>
<Tooltip.Provider>
  <Toaster />
  {@render children()}
</Tooltip.Provider>
