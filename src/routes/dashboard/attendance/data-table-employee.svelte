<script lang="ts">
  import { getEmployeeAvatar } from "$lib/api.dicebear";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Role } from "$lib/enums";
  import type { Row } from "@tanstack/table-core";
  import { onMount } from "svelte";
  import type { Schema } from "./schemas";
  import { EmployeeSchema } from "./schemas.ts";

  let { row }: { row: Row<Schema> } = $props();
  // svelte-ignore state_referenced_locally
  const employee: EmployeeSchema = row.original.employee;

  let avatarURL = $state(employee.avatar_url_preview);

  onMount(async () => {
    if (employee.avatar_url_preview) return;
    avatarURL = await getEmployeeAvatar(employee);
  });
</script>

<div class="flex flex-row gap-3 items-center">
  <Avatar.Root class="w-8 h-8">
    <Avatar.Image src={avatarURL} alt={employee.first_name} />
    <Avatar.Fallback>
      {employee.first_name[0]}
      {employee.last_name[0]}
    </Avatar.Fallback>
  </Avatar.Root>
  <div class="flex flex-col">
    <span>
      {employee.first_name}
      {employee.middle_name}
      {employee.last_name}
    </span>
    <span class="text-muted-foreground text-xs">
      {Role[employee.role_id]}
    </span>
  </div>
</div>
