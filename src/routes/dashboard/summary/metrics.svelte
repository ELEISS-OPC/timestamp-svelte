<script lang="ts">
  import TrendingDownIcon from "@lucide/svelte/icons/trending-down";
  import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
  import { Badge } from "$lib/components/ui/badge";
  import * as Card from "$lib/components/ui/card";
</script>
<div
  class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
>
  <Card.Root class="@container/card">
    <Card.Header>
      <Card.Description>No show Rate</Card.Description>
      <Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        1%
      </Card.Title>
      <Card.Action>
        <Badge variant="outline">
          <TrendingUpIcon />
          +12.5%
        </Badge>
      </Card.Action>
    </Card.Header>
    <Card.Footer class="flex-col items-start gap-1.5 text-sm">
      <div class="line-clamp-1 flex gap-2 font-medium">
        Trending up this month <TrendingUpIcon class="size-4" />
      </div>
      <div class="text-muted-foreground">Shifts missed for the last month</div>
    </Card.Footer>
  </Card.Root>
  <Card.Root class="@container/card">
    <Card.Header>
      <Card.Description>Overtime Rate</Card.Description>
      <Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
      5%
      </Card.Title>
      <Card.Action>
        <Badge variant="outline">
          <TrendingDownIcon />
          -20%
        </Badge>
      </Card.Action>
    </Card.Header>
    <Card.Footer class="flex-col items-start gap-1.5 text-sm">
      <div class="line-clamp-1 flex gap-2 font-medium">
        Down 20% this month <TrendingDownIcon class="size-4" />
      </div>
      <div class="text-muted-foreground">Overtime rate for the last month</div>
    </Card.Footer>
  </Card.Root>
  <Card.Root class="@container/card">
    <Card.Header>
      <Card.Description>Punctuality Rate</Card.Description>
      <Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        95%
      </Card.Title>
      <Card.Action>
        <Badge variant="outline">
          <TrendingUpIcon />
          +12.5%
        </Badge>
      </Card.Action>
    </Card.Header>
    <Card.Footer class="flex-col items-start gap-1.5 text-sm">
      <div class="line-clamp-1 flex gap-2 font-medium">
        Trending up this month <TrendingUpIcon class="size-4" />
      </div>
      <div class="text-muted-foreground">Punctuality rate for the last month</div>
    </Card.Footer>
  </Card.Root>
  <Card.Root class="@container/card">
    <Card.Header>
      <Card.Description>Average BF Score</Card.Description>
      <Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        6
      </Card.Title>
      <Card.Action>
        <Badge variant="outline">
          <TrendingUpIcon />
          +4.5%
        </Badge>
      </Card.Action>
    </Card.Header>
    <Card.Footer class="flex-col items-start gap-1.5 text-sm">
      <div class="line-clamp-1 flex gap-2 font-medium">
        Trending up this month <TrendingUpIcon class="size-4" />
      </div>
      <div class="text-muted-foreground">Average Bradford score for the last month</div>
    </Card.Footer>
  </Card.Root>
</div>