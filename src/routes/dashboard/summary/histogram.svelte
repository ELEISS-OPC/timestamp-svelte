<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index";
  import { ScatterChart } from "layerchart";

  //  const { data }: { data: any[] } = $props();

  const data = [
    { date: new Date("2024-01-01"), time_in: 10, name: "A" },
    { date: new Date("2024-01-01"), time_in: 14, name: "J" },
    { date: new Date("2024-01-02"), time_in: 15, name: "B" },
    { date: new Date("2024-01-03"), time_in: 7, name: "C" },
    { date: new Date("2024-01-04"), time_in: 12, name: "D" },
  ];
</script>

<Chart.Container class="h-75 w-full">
  <ScatterChart {data} x="date" y="time_in">
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </ScatterChart>
</Chart.Container>
