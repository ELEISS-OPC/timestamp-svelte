<script lang="ts">
  import { Spinner } from "$components/ui/spinner";
  import { PUBLIC_IMAGE_HOST, PUBLIC_TIMEZONE } from "$env/static/public";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Popover from "$lib/components/ui/popover";
  import { cn, urlJoin } from "$utils";
  import type { Row } from "@tanstack/table-core";
  import DataTableCoordinates from "./data-table-coordinates.svelte";
  import type { Schema } from "./schemas";

  let { row }: { row: Row<Schema> } = $props();
  let loading = $state(true);
</script>

{#if row.original.time_out}
  <Popover.Root>
    <Popover.Trigger
      class={cn(
        buttonVariants({ variant: "ghost" }),
        "hover:underline font-normal",
      )}
    >
      {new Date(row.original.time_out).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: PUBLIC_TIMEZONE,
      })}
    </Popover.Trigger>
    <Popover.Content class="w-80">
      <div class="space-y-2">
        {#if row.original.time_out_latitude && row.original.time_out_longitude}
          <DataTableCoordinates
            latitude={row.original.time_out_latitude}
            longitude={row.original.time_out_longitude}
          />
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
            onload={() => (loading = false)}
          />
          {#if loading}
            <Spinner />
          {/if}
        {/if}
      </div>
    </Popover.Content>
  </Popover.Root>
{/if}
