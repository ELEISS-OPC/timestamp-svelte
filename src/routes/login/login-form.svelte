<script lang="ts">
  import { Spinner } from "$components/ui/spinner";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { cn } from "$utils";
  import {
    type Infer,
    superForm,
    type SuperValidated,
  } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { formSchema, type FormSchema } from "./schema";
  import SuccessfulLogin from "./successful-login.svelte";
  import PasswordInput from "$components/custom/password-input.svelte";

  let {
    class: className,
    data,
  }: {
    class?: string;
    data: { form: SuperValidated<Infer<FormSchema>> };
  } = $props();

  const id = $props.id();

  // svelte-ignore state_referenced_locally
  const form = superForm(data.form, {
    validators: zod4Client(formSchema),
    onSubmit: () => {
      loading = true;
    },
    onError: () => {
      loading = false;
    },
    onResult: () => {
      loading = false;
      success = true;
    },
  });

  const { form: formData, enhance, errors } = form;
  let loading: boolean = $state(false);
  let success: boolean = $state(false);
</script>

<div class={cn("flex flex-col gap-6", className)}>
  <Card.Root>
    {#if !success}
      <Card.Header class="text-center">
        <Card.Title class="text-xl">Welcome back</Card.Title>
        <Card.Description>Login with your company email</Card.Description>
      </Card.Header>
      <Card.Content>
        <form method="POST" use:enhance action="?/login">
          <FieldGroup>
            <Field>
              <FieldLabel for="email-{id}">Email</FieldLabel>
              <Input
                id="email-{id}"
                name="email"
                type="email"
                placeholder="name@infinetsolutionsph.com"
                bind:value={$formData.email}
                required
                autocomplete="email"
              />
              {#if $errors.email}
                <span class="text-destructive text-sm">{$errors.email}</span>
              {/if}
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="password-{id}">Password</FieldLabel>
                <a
                  href="##"
                  class="ms-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <PasswordInput
                id="password-{id}"
                name="password"
                required
                bind:value={$formData.password}
                autocomplete="current-password"
              />
              {#if $errors.password}
                <span class="text-destructive text-sm">{$errors.password}</span>
              {/if}
            </Field>
            <Field>
              <Button type="submit" disabled={loading}>
                {#if loading}
                  <Spinner />
                {/if}
                Login
              </Button>
              <FieldDescription class="text-center">
                Don't have an account? <a href="##">Ask an officer for one</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </Card.Content>
    {:else}
      <SuccessfulLogin />
    {/if}
  </Card.Root>
</div>
