<script lang="ts">
  import ShiftsSummary from "./shifts-summary.svelte";
  import Metrics from "./metrics.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<div class="@container/main flex flex-1 flex-col self-center">
  <div class="flex flex-col gap-4 md:gap-6">
    <ShiftsSummary data={data.shiftsSummary} />
    <Metrics data={data.metricsSummary} />
  </div>
</div>
