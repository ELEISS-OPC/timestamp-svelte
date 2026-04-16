<script lang="ts">
  import { getEmployeeAvatar } from "$lib/api.dicebear";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Role } from "$lib/enums";
  import type { Employee } from "$lib/types";
  import { onMount } from "svelte";

  let { user }: { user: Employee } = $props();
  // svelte-ignore state_referenced_locally
  let avatarURL = $state(user.avatar_url_preview);

  onMount(async () => {
    if (user.avatar_url_preview) return;
    avatarURL = await getEmployeeAvatar(user);
  });
</script>

<div class="flex flex-row gap-3 items-center">
  <Avatar.Root class="w-8 h-8">
    <Avatar.Image src={avatarURL} alt={user.first_name} />
    <Avatar.Fallback>
      {`${user.first_name[0]}${user.last_name[0]}`}
    </Avatar.Fallback>
  </Avatar.Root>
  <div class="flex flex-col">
    <span>
      {user.first_name}
      {user.middle_name}
      {user.last_name}
    </span>
    <span class="text-muted-foreground text-xs">
      {Role[user.role_id]}
    </span>
  </div>
</div>
