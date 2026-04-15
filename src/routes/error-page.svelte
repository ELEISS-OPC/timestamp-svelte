<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { FrownIcon } from "@lucide/svelte/icons";
  import type { Snippet } from "svelte";
  let {
    children,
    code,
    description,
    message,
    footer,
  }: {
    children?: Snippet;
    code: number;
    description: string;
    message: string;
    footer?: string;
  } = $props();
</script>

<div class="flex h-screen w-full items-center justify-center bg-muted">
  <Card.Root class="-my-4 w-full max-w-sm">
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        {code}
        <FrownIcon />
      </Card.Title>
      <Card.Description>{description}</Card.Description>
      {#if children}
        <Card.Action>
          {@render children()}
        </Card.Action>
      {/if}
    </Card.Header>
    <Card.Content>
      <p class="text-sm">
        {message}
      </p>
    </Card.Content>
    <Card.Footer>
      <p class="text-xs text-muted-foreground">
        Error code: {code}. {footer}
      </p>
    </Card.Footer>
  </Card.Root>
</div>
