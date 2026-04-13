<script lang="ts">
  import type { Row } from "@tanstack/table-core";
  import type { Schema } from "./schemas";
  import type { EmployeeSchema } from "./schemas";

  let { row }: { row: Row<Schema> } = $props();
  const employee: EmployeeSchema = row.original.employee;
</script>

{employee.first_name}
{employee.middle_name}
{employee.last_name}
