<script lang="ts">
  import { getEmployeeAvatar } from "$lib/api.dicebear";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Role } from "$lib/enums";
  import type { Employee } from "$lib/types";
  import { onMount } from "svelte";

  let { user }: { user: Employee } = $props();
  let avatarURLpreview = $derived(user.avatar_url_preview);
  let avatarURL = $derived(user.avatar_url);

  onMount(async () => {
    if (user.avatar_url_preview && user.avatar_url) return;
    avatarURLpreview = await getEmployeeAvatar(user);
    avatarURL = await getEmployeeAvatar(user, { scale: 100 });
  });
</script>

<Popover.Root>
  <div class="flex flex-row gap-3 items-center">
    <Popover.Trigger class="flex flex-row gap-3 items-center">
      <Avatar.Root class="w-8 h-8">
        <Avatar.Image src={avatarURLpreview} alt={user.first_name} />
        <Avatar.Fallback>
          {`${user.first_name[0]}${user.last_name[0]}`}
        </Avatar.Fallback>
      </Avatar.Root>
    </Popover.Trigger>
    <Popover.Content class="p-0 overflow-hidden">
      <img src={avatarURL} alt={user.first_name} />
    </Popover.Content>
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
</Popover.Root>
