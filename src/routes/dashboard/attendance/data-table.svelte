<script lang="ts" module>
  export const columns: ColumnDef<Schema>[] = [
    {
      id: "drag",
      header: () => null,
      cell: () => renderComponent(DataTableDragHandle, {}),
    },
    {
      id: "select",
      header: ({ table }) =>
        renderComponent(DataTableCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          indeterminate:
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected(),
          onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
          "aria-label": "Select all",
        }),
      cell: ({ row }) =>
        renderComponent(DataTableCheckbox, {
          checked: row.getIsSelected(),
          onCheckedChange: (value) => row.toggleSelected(!!value),
          "aria-label": "Select row",
        }),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "employee",
      header: "Employee",
      cell: ({ row }) => renderComponent(DataTableEmployee, { row }),
    },
    {
      accessorKey: "time_in",
      header: "Time In",
      cell: ({ row }) => renderComponent(DataTableTimeIn, { row }),
    },
    {
      accessorKey: "time_out",
      header: "Time Out",
      cell: ({ row }) => renderComponent(DataTableTimeOut, { row }),
    },
    {
      id: "actions",
      cell: () => renderComponent(DataTableActions, {}),
    },
  ];
</script>

<script lang="ts">
  import {
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type ColumnDef,
    type ColumnFiltersState,
    type PaginationState,
    type Row,
    type RowSelectionState,
    type SortingState,
    type VisibilityState,
  } from "@tanstack/table-core";
  import type { Schema } from "./schemas";
  import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
  import { createSvelteTable } from "$lib/components/ui/data-table";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import {
    FlexRender,
    renderComponent,
  } from "$lib/components/ui/data-table/index.js";
  import LayoutColumnsIcon from "@tabler/icons-svelte/icons/layout-columns";
  import ChevronDownIcon from "@tabler/icons-svelte/icons/chevron-down";
  import ChevronsLeftIcon from "@tabler/icons-svelte/icons/chevrons-left";
  import ChevronLeftIcon from "@tabler/icons-svelte/icons/chevron-left";
  import ChevronRightIcon from "@tabler/icons-svelte/icons/chevron-right";
  import ChevronsRightIcon from "@tabler/icons-svelte/icons/chevrons-right";
  import DataTableCheckbox from "./data-table-checkbox.svelte";
  import DataTableTimeIn from "./data-table-time-in.svelte";
  import DataTableTimeOut from "./data-table-time-out.svelte";
  import DataTableEmployee from "./data-table-employee.svelte";
  import DataTableActions from "./data-table-actions.svelte";
  import DataTableDragHandle from "./data-table-drag-handle.svelte";
  import { DragDropProvider } from "@dnd-kit-svelte/svelte";
  import { move } from "@dnd-kit/helpers";
  import { useSortable } from "@dnd-kit-svelte/svelte/sortable";
  import { Badge } from "$lib/components/ui/badge/index.js";

  let { data }: { data: Schema[] } = $props();
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let sorting = $state<SortingState>([]);
  let columnFilters = $state<ColumnFiltersState>([]);
  let rowSelection = $state<RowSelectionState>({});
  let columnVisibility = $state<VisibilityState>({});

  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns,
    state: {
      get pagination() {
        return pagination;
      },
      get sorting() {
        return sorting;
      },
      get columnVisibility() {
        return columnVisibility;
      },
      get rowSelection() {
        return rowSelection;
      },
      get columnFilters() {
        return columnFilters;
      },
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        pagination = updater(pagination);
      } else {
        pagination = updater;
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        sorting = updater(sorting);
      } else {
        sorting = updater;
      }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === "function") {
        columnFilters = updater(columnFilters);
      } else {
        columnFilters = updater;
      }
    },
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === "function") {
        columnVisibility = updater(columnVisibility);
      } else {
        columnVisibility = updater;
      }
    },
    onRowSelectionChange: (updater) => {
      if (typeof updater === "function") {
        rowSelection = updater(rowSelection);
      } else {
        rowSelection = updater;
      }
    },
  });

  let views = [
    {
      id: "today",
      label: "Today",
      badge: 0,
    },
    {
      id: "yesterday",
      label: "Yesterday",
      badge: 3,
    },
    {
      id: "history",
      label: "History",
      badge: 0,
    },
  ];

  let view = $state("today");
  let viewLabel = $derived(
    views.find((v) => view === v.id)?.label ?? "Select a view",
  );
</script>

<Tabs.Root value="today" class="w-full flex-col justify-start gap-6">
  <div class="flex items-center justify-between px-4 lg:px-6">
    <Label for="view-selector" class="sr-only">View</Label>
    <Select.Root type="single" bind:value={view}>
      <Select.Trigger class="flex w-fit sm:hidden" size="sm" id="view-selector">
        {viewLabel}
      </Select.Trigger>
      <Select.Content>
        {#each views as view (view.id)}
          <Select.Item value={view.id}>{view.label}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <Tabs.List
      class="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 sm:flex"
    >
      {#each views as view (view.id)}
        <Tabs.Trigger value={view.id}>
          {view.label}
          {#if view.badge > 0}
            <Badge variant="secondary">{view.badge}</Badge>
          {/if}
        </Tabs.Trigger>
      {/each}
    </Tabs.List>
    <div class="flex items-center gap-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Button variant="outline" size="sm" {...props}>
              <LayoutColumnsIcon />
              <span class="hidden lg:inline">Customize Columns</span>
              <span class="lg:hidden">Columns</span>
              <ChevronDownIcon />
            </Button>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" class="w-56">
          {#each table
            .getAllColumns()
            .filter((col) => typeof col.accessorFn !== "undefined" && col.getCanHide()) as column (column.id)}
            <DropdownMenu.CheckboxItem
              class="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenu.CheckboxItem>
          {/each}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </div>
  <Tabs.Content
    value="today"
    class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
  >
    <div class="overflow-hidden rounded-lg border">
      <DragDropProvider
        modifiers={[RestrictToVerticalAxis]}
        onDragEnd={(e) => (data = move(data, e))}
      >
        <Table.Root>
          <Table.Header class="bg-muted sticky top-0 z-10">
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
              <Table.Row>
                {#each headerGroup.headers as header (header.id)}
                  <Table.Head colspan={header.colSpan}>
                    {#if !header.isPlaceholder}
                      <FlexRender
                        content={header.column.columnDef.header}
                        context={header.getContext()}
                      />
                    {/if}
                  </Table.Head>
                {/each}
              </Table.Row>
            {/each}
          </Table.Header>
          <Table.Body class="**:data-[slot=table-cell]:first:w-8">
            {#if table.getRowModel().rows?.length}
              {#each table.getRowModel().rows as row (row.id)}
                {@render DraggableRow({ row })}
              {/each}
            {:else}
              <Table.Row>
                <Table.Cell colspan={columns.length} class="h-24 text-center">
                  No results.
                </Table.Cell>
              </Table.Row>
            {/if}
          </Table.Body>
        </Table.Root>
      </DragDropProvider>
    </div>
    <div class="flex items-center justify-between px-4">
      <div class="text-muted-foreground hidden flex-1 text-sm lg:flex">
        {table.getFilteredSelectedRowModel().rows.length} of
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div class="flex w-full items-center gap-8 lg:w-fit">
        <div class="hidden items-center gap-2 lg:flex">
          <Label for="rows-per-page" class="text-sm font-medium"
            >Rows per page</Label
          >
          <Select.Root
            type="single"
            bind:value={
              () => `${table.getState().pagination.pageSize}`,
              (v) => table.setPageSize(Number(v))
            }
          >
            <Select.Trigger size="sm" class="w-20" id="rows-per-page">
              {table.getState().pagination.pageSize}
            </Select.Trigger>
            <Select.Content side="top">
              {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
                <Select.Item value={pageSize.toString()}>
                  {pageSize}
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex w-fit items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of
          {table.getPageCount()}
        </div>
        <div class="ms-auto flex items-center gap-2 lg:ms-0">
          <Button
            variant="outline"
            class="hidden h-8 w-8 p-0 lg:flex"
            onclick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span class="sr-only">Go to first page</span>
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            class="size-8"
            size="icon"
            onclick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span class="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            class="size-8"
            size="icon"
            onclick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span class="sr-only">Go to next page</span>
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            class="hidden size-8 lg:flex"
            size="icon"
            onclick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span class="sr-only">Go to last page</span>
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  </Tabs.Content>
  <Tabs.Content value="past-performance" class="flex flex-col px-4 lg:px-6">
    <div
      class="aspect-video w-full flex-1 rounded-lg border border-dashed"
    ></div>
  </Tabs.Content>
  <Tabs.Content value="key-personnel" class="flex flex-col px-4 lg:px-6">
    <div
      class="aspect-video w-full flex-1 rounded-lg border border-dashed"
    ></div>
  </Tabs.Content>
  <Tabs.Content value="focus-documents" class="flex flex-col px-4 lg:px-6">
    <div
      class="aspect-video w-full flex-1 rounded-lg border border-dashed"
    ></div>
  </Tabs.Content>
</Tabs.Root>

{#snippet DraggableRow({ row }: { row: Row })}
  {@const { ref, isDragging, handleRef } = useSortable({
    id: row.original.id,
    index: () => row.index,
  })}

  <Table.Row
    data-state={row.getIsSelected() && "selected"}
    data-dragging={isDragging.current}
    class="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
    {@attach ref}
  >
    {#each row.getVisibleCells() as cell (cell.id)}
      <Table.Cell>
        <FlexRender
          attach={handleRef}
          content={cell.column.columnDef.cell}
          context={cell.getContext()}
        />
      </Table.Cell>
    {/each}
  </Table.Row>
{/snippet}
