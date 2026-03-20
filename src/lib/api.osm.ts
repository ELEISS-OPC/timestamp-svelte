export function ReverseGeocode(latitude: number, longitude: number) {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to reverse geocode location.");
      }
      return res.json();
    })
    .then((data) => data.display_name ?? "Address not found");
}
