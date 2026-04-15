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
    },
    [STATUS.HTTP_500_INTERNAL_SERVER_ERROR]: {
      description: "Something went wrong on our end.",
      message:
        "Check back later or contact your administrator if the problem persists.",
    },
  } as const;

  const content = errors[page.status as keyof typeof errors] ?? {
    description: "We don't know what went wrong, but something did.",
    message:
      "Check back later or contact your administrator if the problem persists.",
  };
</script>

<ErrorPage
  code={page.status}
  description={content.description}
  message={content.message}
  footer={page.error?.message}
>
  <Button variant="link" onclick={() => goto("/")}>Home</Button>
</ErrorPage>
