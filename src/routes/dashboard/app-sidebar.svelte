<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import NavProjects from "./nav-dashboard.svelte";
  import NavUser from "./nav-user.svelte";
  import SidebarHeader from "./sidebar-header.svelte";

  import type { Employee } from "$lib/types";
  import CalculatorIcon from "@lucide/svelte/icons/calculator";
  import CalendarClockIcon from "@lucide/svelte/icons/calendar-clock";
  import ChartPieIcon from "@lucide/svelte/icons/chart-pie";
  import UsersIcon from "@lucide/svelte/icons/users";

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
    {
      name: "Employees",
      url: "/dashboard/employees",
      icon: UsersIcon,
    }
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
