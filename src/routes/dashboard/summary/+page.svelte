<script lang="ts">
  import ShiftsSummary from "./shifts-summary.svelte";
  import Metrics from "./metrics.svelte";
  import type { PageProps } from "./$types";
  import * as Select from "$lib/components/ui/select/index.js";

  let { data }: PageProps = $props();

  const aggregateFns = [
    { label: "Median", value: "median" },
    { label: "Average", value: "average" },
    { label: "Sum", value: "sum" },
    { label: "Minimum", value: "min" },
    { label: "Maximum", value: "max" },
  ]

  let selectedAggregateFn = $state("median");
  const triggerContent = $derived(
    aggregateFns.find((f) => f.value === selectedAggregateFn)?.label ?? "Select an aggregate function"
  );

  let aggregateFnForm: HTMLFormElement | null = null;

  function aggregateFnFormSubmit() {
    aggregateFnForm?.requestSubmit();
  }
</script>

<div class="@container/main flex flex-1 flex-col self-center">
  <div class="flex flex-col gap-2 md:gap-4">
    <ShiftsSummary data={data.shiftsSummary} />
    <form class="flex justify-between" bind:this={aggregateFnForm}>
      <h1 class="text-2xl font-semibold tracking-tight">Key Metrics</h1>
      <Select.Root
        type="single"
        name="aggregateFn"
        bind:value={selectedAggregateFn}
        onValueChange={aggregateFnFormSubmit}
      >
        <Select.Trigger class="w-45">
          {triggerContent}
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Aggregate Functions</Select.Label>
            {#each aggregateFns as fn (fn.value)}
              <Select.Item
                value={fn.value}
                label={fn.label}
              >
                {fn.label}
              </Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </form>
    <Metrics data={data.metricsSummary} />
  </div>
</div>
