<script lang="ts">
  import TrendingDownIcon from "@lucide/svelte/icons/trending-down";
  import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
  import { Badge } from "$lib/components/ui/badge";
  import * as Card from "$lib/components/ui/card";
  import type { MetricsSummary, Metric } from "./types";

  const { data }: { data: MetricsSummary } = $props();
</script>

{#snippet TrendBadge(metric: Metric)}
  {#if metric.pctChange_1month}
    <Card.Action>
      <Badge variant="outline">
        {#if metric.pctChange_1month > 0}
          <TrendingUpIcon />
        {:else if metric.pctChange_1month < 0}
          <TrendingDownIcon />
        {/if}
        {metric.pctChange_1month}%
      </Badge>
    </Card.Action>
  {/if}
{/snippet}

{#snippet TrendComment(metric: Metric)}
  {#if metric.comment}
    <div class="line-clamp-1 flex gap-2 font-medium">
      {metric.comment}
    </div>
  {/if}
{/snippet}

{#snippet MetricValue(metric: Metric)}
  {metric.value}{metric.isPercentage ? "%" : ""}
{/snippet}

<div
  class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
>
  <Card.Root class="@container/card">
    <Card.Header>
      <Card.Description>No show Rate</Card.Description>
      <Card.Title
        class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
      >
        {@render MetricValue(data.no_show_rate)}
      </Card.Title>
      {@render TrendBadge(data.no_show_rate)}
    </Card.Header>
    <Card.Footer class="flex-col items-start gap-1.5 text-sm">
      {@render TrendComment(data.no_show_rate)}
      <div class="text-muted-foreground">Shifts missed for the last month</div>
    </Card.Footer>
  </Card.Root>
  <Card.Root class="@container/card">
    <Card.Header>
      <Card.Description>Overtime Rate</Card.Description>
      <Card.Title
        class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
      >
        {@render MetricValue(data.overtime_rate)}
      </Card.Title>
      {@render TrendBadge(data.overtime_rate)}
    </Card.Header>
    <Card.Footer class="flex-col items-start gap-1.5 text-sm">
      {@render TrendComment(data.overtime_rate)}
      <div class="text-muted-foreground">Overtime rate for the last month</div>
    </Card.Footer>
  </Card.Root>
  <Card.Root class="@container/card">
    <Card.Header>
      <Card.Description>Punctuality Rate</Card.Description>
      <Card.Title
        class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
      >
        {@render MetricValue(data.punctuality_rate)}
      </Card.Title>
      {@render TrendBadge(data.punctuality_rate)}
    </Card.Header>
    <Card.Footer class="flex-col items-start gap-1.5 text-sm">
      {@render TrendComment(data.punctuality_rate)}
      <div class="text-muted-foreground">Punctuality rate for the last month</div>
    </Card.Footer>
  </Card.Root>
  <Card.Root class="@container/card">
    <Card.Header>
      <Card.Description>Average BF Score</Card.Description>
      <Card.Title
        class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
      >
        {@render MetricValue(data.average_bf_score)}
      </Card.Title>
      {@render TrendBadge(data.average_bf_score)}
    </Card.Header>
    <Card.Footer class="flex-col items-start gap-1.5 text-sm">
      {@render TrendComment(data.average_bf_score)}
      <div class="text-muted-foreground">
        Punctuality rate for the last month
      </div>
    </Card.Footer>
  </Card.Root>
</div>
