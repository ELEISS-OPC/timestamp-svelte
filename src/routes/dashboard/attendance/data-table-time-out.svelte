<script lang="ts">
  import { PUBLIC_IMAGE_HOST, PUBLIC_TIMEZONE } from "$env/static/public";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Popover from "$lib/components/ui/popover";
  import { cn, urlJoin } from "$utils";
  import type { Row } from "@tanstack/table-core";
  import type { Schema } from "./schemas";
  import DataTableCoordinates from "./data-table-coordinates.svelte";

  let { row }: { row: Row<Schema> } = $props();
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
        <DataTableCoordinates {row} />
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
