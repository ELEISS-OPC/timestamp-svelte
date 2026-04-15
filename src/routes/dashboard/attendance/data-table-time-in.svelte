<script lang="ts">
  import { PUBLIC_IMAGE_HOST, PUBLIC_TIMEZONE } from "$env/static/public";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Popover from "$lib/components/ui/popover";
  import { cn, urlJoin } from "$utils";
  import type { Row } from "@tanstack/table-core";
  import DataTableCoordinates from "./data-table-coordinates.svelte";
  import type { Schema } from "./schemas";
  import { Spinner } from "$components/ui/spinner";

  let { row }: { row: Row<Schema> } = $props();
  let loading = $state(true);
</script>

<Popover.Root>
  <Popover.Trigger
    class={cn(
      buttonVariants({ variant: "ghost" }),
      "hover:underline font-normal",
    )}
  >
    {new Date(row.original.time_in).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: PUBLIC_TIMEZONE,
    })}
  </Popover.Trigger>
  <Popover.Content class="w-80">
    <div class="space-y-2">
      <DataTableCoordinates
        latitude={row.original.time_in_latitude}
        longitude={row.original.time_in_longitude}
      />
      {#if row.original.time_in_selfie_preview}
        <h4 class="leading-none font-medium">Selfie</h4>
        <img
          src={urlJoin(PUBLIC_IMAGE_HOST, row.original.time_in_selfie_preview)}
          alt="Time In Selfie"
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
