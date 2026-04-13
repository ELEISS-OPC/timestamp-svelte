<script lang="ts">
  import { PUBLIC_IMAGE_HOST, PUBLIC_TIMEZONE } from "$env/static/public";
  import { ReverseGeocode } from "$lib/api.osm";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Popover from "$lib/components/ui/popover";
  import { cn, urlJoin } from "$utils";
  import type { Row } from "@tanstack/table-core";
  import type { Schema } from "./schemas";

  let { row }: { row: Row<Schema> } = $props();

  let address: string = $state("");
  async function getLocation() {
    if (address) return;
    try {
      const res = await ReverseGeocode(
        row.original.time_in_lat,
        row.original.time_in_lng,
      );
      address = res;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      address = "Address not available";
    }
  }
</script>

<Popover.Root>
  <Popover.Trigger
    class={cn(
      buttonVariants({ variant: "ghost" }),
      "hover:underline font-normal",
    )}
    onclick={getLocation}
  >
    {new Date(row.original.time_in).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: PUBLIC_TIMEZONE,
    })}
  </Popover.Trigger>
  <Popover.Content class="w-80">
    <div class="space-y-2">
      {#if address}
        <h4 class="leading-none font-medium">Address</h4>
        <p class="text-muted-foreground text-sm">
          {address}
          {#if row.original.time_in_lat !== null && row.original.time_in_lng !== null}
            ({row.original.time_in_lat.toFixed(4)}, {row.original.time_in_lng.toFixed(
              4,
            )})
          {/if}
        </p>
      {/if}
      {#if row.original.time_in_selfie_preview}
        <h4 class="leading-none font-medium">Selfie</h4>
        <img
          src={urlJoin(PUBLIC_IMAGE_HOST, row.original.time_in_selfie_preview)}
          alt="Time In Selfie"
          class="w-full h-auto rounded-md"
        />
      {/if}
    </div>
  </Popover.Content>
</Popover.Root>
