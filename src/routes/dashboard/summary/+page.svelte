<script lang="ts">
  import ShiftSummary from "./shift-summary.svelte";
  import Metrics from "./metrics.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<div class="@container/main flex flex-1 flex-col self-center">
  <div class="flex flex-col gap-4 md:gap-6">
    <ShiftSummary chartData={data.chartData} />
    <Metrics data={data.metricsSummary} />
  </div>
</div>
