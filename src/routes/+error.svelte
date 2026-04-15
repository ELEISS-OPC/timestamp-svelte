<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button";
  import ErrorPage from "./error-page.svelte";
</script>

{#if page.status === 404}
  <ErrorPage
    code={page.status}
    description="Couldn't find what page you were looking for."
    message={"If you think this page should exist, please contact your administrator."}
    footer={page.error?.message}
  >
    <Button variant="link" onclick={() => goto("/")}>Home</Button>
  </ErrorPage>
{:else if page.status === 500}
  <ErrorPage
    code={page.status}
    description="Something went wrong on our end."
    message={"Check back later or contact your administrator if the problem persists."}
    footer={page.error?.message}
  >
    <Button variant="link" onclick={() => goto("/")}>Home</Button>
  </ErrorPage>
{:else}
  <ErrorPage
    code={page.status}
    description="We don't know what went wrong, but something did."
    message={"Check back later or contact your administrator if the problem persists."}
    footer={page.error?.message}
  >
    <Button variant="link" onclick={() => goto("/")}>Home</Button>
  </ErrorPage>
{/if}
