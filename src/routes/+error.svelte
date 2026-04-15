<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button";
  import STATUS from "$lib/status";
  import ErrorPage from "./error-page.svelte";

  const errors = {
    [STATUS.HTTP_404_NOT_FOUND]: {
      description: "Couldn't find what page you were looking for.",
      message:
        "If you think this page should exist, please contact your administrator.",
      action: homeButton,
    },
    [STATUS.HTTP_500_INTERNAL_SERVER_ERROR]: {
      description: "Something went wrong on our end.",
      message:
        "Check back later or contact your administrator if the problem persists.",
      action: contactSupport,
    },
  };

  const content = errors[page.status as keyof typeof errors] ?? {
    description: "We don't know what went wrong, but something did.",
    message: "Check back later...",
    action: homeButton,
  };
</script>

{#snippet homeButton()}
  <Button variant="link" onclick={() => goto("/")}>Home</Button>
{/snippet}

{#snippet contactSupport()}
  <Button variant="outline">Contact Support</Button>
{/snippet}

<ErrorPage
  code={page.status}
  description={content.description}
  message={content.message}
  footer={page.error?.message}
>
  {#if content.action}
    {@render content.action()}
  {/if}
</ErrorPage>
