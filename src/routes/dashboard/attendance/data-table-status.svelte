<script lang="ts">
	import { Badge } from "$lib/components/ui/badge/index.js";
	import CircleCheckFilledIcon from "@tabler/icons-svelte/icons/circle-check-filled";
	import CircleIcon from "@tabler/icons-svelte/icons/circle";
	import type { Row } from "@tanstack/table-core";
	import type { Schema } from "./schemas";
	import { TimestampStatus } from "$lib/enums";

	let { row }: { row: Row<Schema> } = $props();
</script>

<Badge variant="outline" class="text-muted-foreground px-1.5">
	{#if row.original.status == TimestampStatus.TIMED_IN}
		<CircleCheckFilledIcon class="fill-green-500 dark:fill-green-400" />
		Timed in
	{:else}
		<CircleIcon/>
		Timed out
	{/if}
</Badge>
