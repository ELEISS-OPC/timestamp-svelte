<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  let {
    dashboardItems,
  }: {
    dashboardItems: {
      name: string;
      url: string;
      icon: any;
    }[];
  } = $props();
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
  <Sidebar.GroupLabel>Dashboard</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each dashboardItems as item (item.name)}
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href={item.url} {...props}>
              <item.icon />
              <span>{item.name}</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
