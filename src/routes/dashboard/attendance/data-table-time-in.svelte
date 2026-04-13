<script lang="ts">
  import type { Row } from "@tanstack/table-core";
  import type { Schema } from "./schemas";

  let { row }: { row: Row<Schema> } = $props();
</script>

{new Date(row.original.time_out).toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
})}