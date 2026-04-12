<script lang="ts">
  let {
    image,
  }: {
    image: string;
  } = $props();
</script>

<div class="absolute inset-0 z-10">
  <img
    src={`data:image/png;base64,${image}`}
    alt="Captured reference"
    class="w-full h-full object-cover"
  />
</div>
