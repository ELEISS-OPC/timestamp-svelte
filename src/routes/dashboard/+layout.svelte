<script lang="ts">
  import type { LayoutProps } from "./$types";
  import AppSidebar from "./app-sidebar.svelte";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { page } from "$app/state";
  import { toTitleCase } from "$lib/string.js";

  let { data, children }: LayoutProps = $props();
  const currentPath = $derived(page.url.pathname);

  function getSubPath(path: string) {
    const segments = path.split("/").filter(Boolean);
    return segments.length > 1 ? segments[segments.length - 1] : "";
  }

  const currentSubPath = $derived(getSubPath(currentPath));
</script>

<Sidebar.Provider>
  <AppSidebar employee={data} />
  <Sidebar.Inset>
    <header
      class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
    >
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ms-1" />
        <Separator
          orientation="vertical"
          class="me-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item class="hidden md:block">
              <Breadcrumb.Page>Dashboard</Breadcrumb.Page>
            </Breadcrumb.Item>
            {#if currentSubPath}
              <Breadcrumb.Separator class="hidden md:block" />
            {/if}
            <Breadcrumb.Item>
              <Breadcrumb.Page>{toTitleCase(currentSubPath)}</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>
    </header>
    <div class="px-8">
      {@render children()}
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
