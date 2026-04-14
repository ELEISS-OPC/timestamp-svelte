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
    if (
      row.original.time_out_latitude === null ||
      row.original.time_out_longitude === null
    ) {
      address = "Address not available";
      return;
    }
    try {
      const res = await ReverseGeocode(
        row.original.time_out_latitude,
        row.original.time_out_longitude,
      );
      address = res;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      address = "Address not available";
    }
  }
</script>

{#if row.original.time_out}
  <Popover.Root>
    <Popover.Trigger
      class={cn(
        buttonVariants({ variant: "ghost" }),
        "hover:underline font-normal",
      )}
      onclick={getLocation}
    >
      {new Date(row.original.time_out).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: PUBLIC_TIMEZONE,
      })}
    </Popover.Trigger>
    <Popover.Content class="w-80">
      <div class="space-y-2">
        {#if address || address === "Location not available"}
          <h4 class="leading-none font-medium">Address</h4>
          <p class="text-muted-foreground text-sm">
            {address}
            {#if row.original.time_out_latitude !== null && row.original.time_out_longitude !== null}
              ({row.original.time_out_latitude.toFixed(4)}, {row.original.time_out_longitude.toFixed(
                4,
              )})
            {/if}
          </p>
        {/if}
        {#if row.original.time_out_selfie_preview}
          <h4 class="leading-none font-medium">Selfie</h4>
          <img
            src={urlJoin(
              PUBLIC_IMAGE_HOST,
              row.original.time_out_selfie_preview,
            )}
            alt="Time Out Selfie"
            class="w-full h-auto rounded-md"
          />
        {/if}
      </div>
    </Popover.Content>
  </Popover.Root>
{/if}
