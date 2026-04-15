<script lang="ts">
  import { page } from "$app/state";
  import ErrorPage from "./error-page.svelte";
  import { Button } from "$lib/components/ui/button";
  import { goto } from "$app/navigation";
</script>

{#if page.status === 404}
  <ErrorPage
    code={page.status}
    description="Couldn't find what page you were looking for."
    message={"If you think this page should exist, please contact your administrator."}
    stack={page.error?.message}
  >
    <Button variant="link" onclick={() => goto("/")}>Home</Button>
  </ErrorPage>
{/if}
{#if page.status === 500}
  <ErrorPage
    code={page.status}
    description="Something went wrong on our end."
    message={"Check back later or contact your administrator if the problem persists."}
    stack={page.error?.message}
  >
    <Button variant="link" onclick={() => goto("/")}>Home</Button>
  </ErrorPage>
{/if}
