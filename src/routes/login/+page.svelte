<script lang="ts">
  import type { PageData } from "./$types.js";
  import LoginForm from "./login-form.svelte";
  import CompanyLogo from "$lib/assets/infinet-no-base-1280x1280.png";
  let { data }: { data: PageData } = $props();
</script>

<div
  class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <a href="##" class="flex items-center gap-2 self-center font-medium">
      <div class="flex items-center justify-center">
        <img src={CompanyLogo} alt="Company Logo" class="size-8" />
      </div>
      <span>EL & E InfiNet SolutionsPH Systems OPC</span>
    </a>
    <LoginForm {data} />
  </div>
</div>
