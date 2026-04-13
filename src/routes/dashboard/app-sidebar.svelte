<script lang="ts">
  import NavProjects from "./nav-dashboard.svelte";
  import NavUser from "./nav-user.svelte";
  import SidebarHeader from "./sidebar-header.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  import ChartPieIcon from "@lucide/svelte/icons/chart-pie";
  import CalendarClockIcon from "@lucide/svelte/icons/calendar-clock";
  import CalculatorIcon from "@lucide/svelte/icons/calculator";
  import type { Employee } from "$lib/types";

  let { employee }: { employee: Employee } = $props();

  const dashboardItems = [
    {
      name: "Summary",
      url: "/dashboard/summary",
      icon: ChartPieIcon,
    },
    {
      name: "Attendance",
      url: "/dashboard/attendance",
      icon: CalendarClockIcon,
    },
    {
      name: "Calculator",
      url: "#",
      icon: CalculatorIcon,
    },
  ];
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <SidebarHeader />
  </Sidebar.Header>
  <Sidebar.Content>
    <NavProjects {dashboardItems} />
  </Sidebar.Content>
  <Sidebar.Footer>
    <NavUser user={employee} />
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
