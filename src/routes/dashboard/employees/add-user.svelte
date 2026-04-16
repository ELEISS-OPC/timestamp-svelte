<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import type { Employee } from "$lib/types";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Role } from "$lib/enums";
  let { user }: { user: Employee } = $props();

  let disabledValues = [Role.Admin];

  // svelte-ignore state_referenced_locally
  if (user.role_id === Role.Officer) {
    disabledValues.push(Role.Officer);
  }

  let roles = [
    { value: Role.Admin, label: "Admin" },
    { value: Role.Officer, label: "Officer" },
    { value: Role.Employee, label: "Employee" },
  ] as const;

  let selectValue = $state(String(Role.Employee));

  const triggerContent = $derived(
    roles.find((r) => r.value === Number(selectValue))?.label ??
      "Select a role",
  );
</script>

<Dialog.Root>
  <form>
    <Dialog.Trigger
      type="button"
      class={buttonVariants({ variant: "outline", size: "sm" })}
    >
      <PlusIcon />
      Add user
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-106.25">
      <Dialog.Header>
        <Dialog.Title>Add a user</Dialog.Title>
        <Dialog.Description>Add a new user to the system.</Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4">
        <div class="grid gap-3">
          <Label for="first-name-1">First Name</Label>
          <Input id="first-name-1" name="firstName" />
        </div>
        <div class="grid gap-3">
          <Label for="middle-name-1">Middle Name</Label>
          <Input id="middle-name-1" name="middleName" />
        </div>
        <div class="grid gap-3">
          <Label for="last-name-1">Last Name</Label>
          <Input id="last-name-1" name="lastName" />
        </div>
        <div class="grid gap-3">
          <Label for="email-1">Email</Label>
          <Input
            id="email-1"
            name="email"
            placeholder="name@infinetsolutionsph.com"
          />
        </div>
        <div class="grid gap-3">
          <Label for="password-1">Password</Label>
          <Input id="password-1" name="password" />
        </div>
        <div class="grid gap-3">
          <Label for="role-1">Role</Label>
          <Select.Root type="single" name="role-1" bind:value={selectValue}>
            <Select.Trigger class="w-full">
              {triggerContent}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Role</Select.Label>
                {#each roles as role (role.value)}
                  <Select.Item
                    value={String(role.value)}
                    label={role.label}
                    disabled={disabledValues.includes(role.value)}
                  >
                    {role.label}
                  </Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
      <Dialog.Footer>
        <Dialog.Close
          type="button"
          class={buttonVariants({ variant: "outline" })}
        >
          Cancel
        </Dialog.Close>
        <Button type="submit">Add user</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </form>
</Dialog.Root>
