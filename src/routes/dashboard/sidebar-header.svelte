<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import CompanyLogo from "$lib/assets/infinet-no-base-1280x1280.png";
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <Sidebar.MenuButton size="lg">
      <img src={CompanyLogo} alt="Company Logo" class="size-8" />
      <div class="grid flex-1 text-start text-sm leading-tight">
        <span class="truncate font-medium">
          EL & E InfiNet SolutionsPH Systems OPC
        </span>
        <span class="truncate text-xs">One-Person Corporation</span>
      </div>
    </Sidebar.MenuButton>
  </Sidebar.MenuItem>
</Sidebar.Menu>
