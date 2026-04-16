<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import type { Employee } from "$lib/types";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Role } from "$lib/enums";
  import { AddEmployeeSchema, type AddEmployee } from "./schema";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import {
    type Infer,
    superForm,
    type SuperValidated,
  } from "sveltekit-superforms";
  import { onMount } from "svelte";

  let {
    user,
    form,
  }: { user: Employee; form: SuperValidated<Infer<AddEmployee>> } = $props();

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

  // svelte-ignore state_referenced_locally
  const {
    form: formData,
    enhance,
    errors,
    reset,
  } = superForm(form, {
    validators: zod4Client(AddEmployeeSchema),
    resetForm: true,
    validationMethod: "oninput",
  });

  const triggerContent = $derived(
    roles.find((r) => r.value === Number(selectValue))?.label ??
      "Select a role",
  );

  onMount(() => {
    $formData.role_id = Number(selectValue);
  });
</script>

<Dialog.Root>
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
    <form use:enhance method="POST" action="?/add_user">
      <div class="grid gap-4 mb-4">
        <div class="grid gap-3">
          <Label for="first-name-1">First Name</Label>
          <Input
            id="first-name-1"
            name="first_name"
            required
            bind:value={$formData.first_name}
          />
          {@render inputErrMsg($errors.first_name)}
        </div>
        <div class="grid gap-3">
          <Label for="middle_name"
            >Middle Name <span class="text-muted-foreground text-xs"
              >Optional</span
            >
          </Label>
          <Input
            id="middle_name"
            name="middle_name"
            bind:value={$formData.middle_name}
          />
          {@render inputErrMsg($errors.middle_name)}
        </div>
        <div class="grid gap-3">
          <Label for="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            required
            bind:value={$formData.last_name}
          />
          {@render inputErrMsg($errors.last_name)}
        </div>
        <div class="grid gap-3">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            placeholder="name@infinetsolutionsph.com"
            bind:value={$formData.email}
          />
          {@render inputErrMsg($errors.email)}
        </div>
        <div class="grid gap-3">
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            bind:value={$formData.password}
          />
          {@render inputErrMsg($errors.password)}
        </div>
        <div class="grid gap-3">
          <Label for="role_id">Role</Label>
          <Select.Root
            type="single"
            name="role_id"
            bind:value={selectValue}
            onValueChange={(value) => ($formData.role_id = Number(value))}
          >
            <Select.Trigger class="w-full" id="role_id">
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
            {@render inputErrMsg($errors.role_id)}
          </Select.Root>
        </div>
      </div>
      <Dialog.Footer>
        <Dialog.Close
          type="button"
          onclick={() => reset()}
          class={buttonVariants({ variant: "outline" })}
        >
          Cancel
        </Dialog.Close>
        <Button type="submit">Add user</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>

{#snippet inputErrMsg(value: string[] | undefined)}
  {#if value}
    <span class="text-destructive text-sm">{String(value)}</span>
  {/if}
{/snippet}
