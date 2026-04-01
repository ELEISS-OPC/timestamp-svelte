<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon-32x32.png";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";

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
  {@render children()}
</Tooltip.Provider>
