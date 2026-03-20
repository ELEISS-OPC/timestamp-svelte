<script lang="ts">
  import type { PageData } from "./$types.js";
  import LoginForm from "./login-form.svelte";
  let { data }: { data: PageData } = $props();
</script>

<div
  class="w-screen h-screen flex flex-col items-center justify-center bg-orange-50"
>
  <h1 class="text-3xl font-bold mb-4">Login</h1>
  <div
    class="flex justify-center bg-white shadow-md rounded-md p-4 w-xs max-w-xs z-1"
  >
    <LoginForm {data} />
  </div>
</div>
