<script lang="ts">
  import Histogram from "./histogram.svelte";
  import Metrics from "./metrics.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
  <Histogram chartData={data.chartData} />
  <Metrics />
</div>
