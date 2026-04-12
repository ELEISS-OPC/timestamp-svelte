<script lang="ts">
  let {
    time,
    latitude,
    longitude,
    address,
  }: {
    time: Date;
    latitude: number;
    longitude: number;
    address: string;
  } = $props();

  const timeZone = "Asia/Manila";
  const formatTime = (value: Date) =>
    value.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: timeZone,
    });
</script>

<!-- Time overlay -->
<div
  class="absolute left-3 top-3 rounded-md bg-black/70 px-3 py-1 font-mono text-sm text-white"
>
  {formatTime(time)} - {timeZone}
</div>

<!-- Geolocation overlay -->
{#if latitude !== 0&& longitude !== 0}
  <div
    class="absolute left-3 top-12 rounded-md max-w-xs bg-black/70 px-3 py-1 font-mono text-sm text-white"
  >
    {address} ({latitude.toFixed(6)}, {longitude.toFixed(6)})
  </div>
{/if}
