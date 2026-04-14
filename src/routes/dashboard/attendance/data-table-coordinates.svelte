<script lang="ts">
  import type { Row } from "@tanstack/table-core";
  import type { Schema } from "./schemas";
  import { onMount } from "svelte";
  import { ReverseGeocode } from "$lib/api.osm";

  let { row }: { row: Row<Schema> } = $props();

  let address: string = $state("");
  onMount(async () => {
    if (address) return;
    try {
      const res = await ReverseGeocode(
        row.original.time_in_latitude,
        row.original.time_in_longitude,
      );
      address = res;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      address = "Address not available";
    }
  });
</script>

{#if address}
  <h4 class="leading-none font-medium">Address</h4>

  <p class="text-muted-foreground text-sm">
    {address}
    {#if row.original.time_in_latitude !== null && row.original.time_in_longitude !== null}
      ({row.original.time_in_latitude.toFixed(4)}, {row.original.time_in_longitude.toFixed(
        4,
      )})
    {/if}
  </p>
{/if}
