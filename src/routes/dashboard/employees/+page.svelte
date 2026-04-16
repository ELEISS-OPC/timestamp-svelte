<script lang="ts">
  import DataTable from "./data-table.svelte";
  let { data } = $props();
</script>

<DataTable data={data.users} user={data.user} form={data.form} />
