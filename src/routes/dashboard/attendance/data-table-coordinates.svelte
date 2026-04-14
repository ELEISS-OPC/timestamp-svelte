<script lang="ts">
  import type { Row } from "@tanstack/table-core";
  import type { Schema } from "./schemas";
  import { onMount } from "svelte";
  import { ReverseGeocode } from "$lib/api.osm";
  import { Spinner } from "$components/ui/spinner";

  let { row }: { row: Row<Schema> } = $props();

  let address: string = $state("");
  let loading: boolean = $state(true);
  onMount(async () => {
    if (address) return;
    loading = true;
    try {
      const res = await ReverseGeocode(
        row.original.time_in_latitude,
        row.original.time_in_longitude,
      );
      address = res;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      address = "Address not available";
    } finally {
      loading = false;
    }
  });
</script>

<h4 class="leading-none font-medium">Address</h4>
{#if loading}
  <Spinner />
{/if}
<p class="text-muted-foreground text-sm">
  {#if address}
    {address}
    ({row.original.time_in_latitude.toFixed(4)}, {row.original.time_in_longitude.toFixed(
      4,
    )})
  {:else}
    Address not available
  {/if}
</p>
