import { ReverseGeocode } from "./api.osm";

export function GetCurrentLocation() {
  return new Promise<{ latitude: number; longitude: number }>(
    (resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation is not supported in this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (geoError) => {
          reject(new Error(geoError.message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    },
  );
}

export async function GetLocationWithAddress() {
  try {
    const { latitude, longitude } = await GetCurrentLocation();
    const address = await ReverseGeocode(latitude, longitude);
    return { latitude, longitude, address };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
