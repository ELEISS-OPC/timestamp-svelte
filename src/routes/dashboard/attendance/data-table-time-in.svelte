<script lang="ts">
  import { PUBLIC_TIMEZONE } from "$env/static/public";
  import type { Row } from "@tanstack/table-core";
  import type { Schema } from "./schemas";

  let { row }: { row: Row<Schema> } = $props();
</script>

{new Date(row.original.time_in).toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: PUBLIC_TIMEZONE,
})}
