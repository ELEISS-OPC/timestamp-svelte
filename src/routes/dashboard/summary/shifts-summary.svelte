<script lang="ts">

  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { scaleUtc } from "d3-scale";
  import { Area, AreaChart, ChartClipPath } from "layerchart";
  import { curveNatural } from "d3-shape";
  import ChartContainer from "$ui/chart/chart-container.svelte";
  import { cubicInOut } from "svelte/easing";
  import type { DailyTotalShifts, ShiftsSummary } from "./types";

  let { data }: { data: ShiftsSummary } = $props();

  let timeRange = $state("90d");
  const selectedLabel = $derived.by(() => {
    switch (timeRange) {
      case "90d":
        return "Last 3 months";
      case "30d":
        return "Last 30 days";
      case "7d":
        return "Last 7 days";
      default:
        return "Last 3 months";
    }
  });
  const filteredData = $derived(
    data.daily_shifts.filter((item: DailyTotalShifts) => {
      // eslint-disable-next-line svelte/prefer-svelte-reactivity
      const referenceDate = new Date(data.reference_date)
      let daysToSubtract = 90;
      if (timeRange === "30d") {
        daysToSubtract = 30;
      } else if (timeRange === "7d") {
        daysToSubtract = 7;
      }
      referenceDate.setDate(referenceDate.getDate() - daysToSubtract);
      return item.date >= referenceDate;
    }),
  );
  const chartConfig = {
    shifts: { label: "Shifts", color: "var(--primary)" },
  } satisfies Chart.ChartConfig;
</script>


<Card.Root>
  <Card.Header class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
    <div class="grid flex-1 gap-1 text-center sm:text-start">
      <Card.Title>Timeline</Card.Title>
      <Card.Description> Shifts completed by employees</Card.Description>
    </div>
    <Select.Root type="single" bind:value={timeRange}>
      <Select.Trigger class="w-40 rounded-lg sm:ms-auto" aria-label="Select a value">
        {selectedLabel}
      </Select.Trigger>
      <Select.Content class="rounded-xl">
        <Select.Item value="90d" class="rounded-lg">Last 3 months</Select.Item>
        <Select.Item value="30d" class="rounded-lg">Last 30 days</Select.Item>
        <Select.Item value="7d" class="rounded-lg">Last 7 days</Select.Item>
      </Select.Content>
    </Select.Root>
  </Card.Header>
  <Card.Content>
    <ChartContainer config={chartConfig} class="-ml-3 aspect-auto h-62.5 w-full">
      <AreaChart
        legend
        data={filteredData}
        x="date"
        xScale={scaleUtc()}
        series={[
          {
            key: "shifts",
            label: "Shifts",
            color: chartConfig.shifts.color,
          }
        ]}
        seriesLayout="stack"
        props={{
          xAxis: {
            ticks: timeRange === "7d" ? 7 : undefined,
            format: (v) => {
              return v.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            },
          },
          yAxis: { format: () => "" },
        }}
      >
        {#snippet marks({ context })}
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stop-color="var(--color-shifts)"
                stop-opacity={1.0}
              />
              <stop
                offset="95%"
                stop-color="var(--color-shifts)"
                stop-opacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stop-color="var(--color-shifts)" stop-opacity={0.8} />
              <stop
                offset="95%"
                stop-color="var(--color-shifts)"
                stop-opacity={0.1}
              />
            </linearGradient>
          </defs>
          <ChartClipPath
            initialWidth={0}
            motion={{
              width: { type: "tween", duration: 1000, easing: cubicInOut },
            }}
          >
            {#each context.series.visibleSeries as s (s.key)}
              <Area
                seriesKey={s.key}
                curve={curveNatural}
                fillOpacity={0.4}
                line={{ class: "stroke-1" }}
                motion="tween"
                {...s.props}
                fill={s.key === "desktop"
                  ? "url(#fillDesktop)"
                  : "url(#fillMobile)"}
              />
            {/each}
          </ChartClipPath>
        {/snippet}
        {#snippet tooltip()}
          <Chart.Tooltip
            labelFormatter={(v: Date) => {
              return v.toLocaleDateString("en-US", {
                month: "long",
              });
            }}
            indicator="line"
          />
        {/snippet}
      </AreaChart>
    </ChartContainer>
  </Card.Content>
</Card.Root>
