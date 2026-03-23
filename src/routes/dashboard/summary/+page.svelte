<script lang="ts">
  import Histogram from "./histogram.svelte";
  import * as Card from "$lib/components/ui/card/index";
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Timeline</Card.Title>
    <Card.Description>Overview of attendance patterns.</Card.Description>
  </Card.Header>
  <Card.Content>
    <Histogram />
  </Card.Content>
</Card.Root>
