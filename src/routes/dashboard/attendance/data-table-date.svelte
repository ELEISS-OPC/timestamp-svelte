<script lang="ts">
  import { PUBLIC_TIMEZONE } from "$env/static/public";
  import type { Row } from "@tanstack/table-core";
  import type { Schema } from "./schemas";

  let { row }: { row: Row<Schema> } = $props();
</script>

{new Date(row.original.time_in).toLocaleDateString("en-CA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: PUBLIC_TIMEZONE,
})}
