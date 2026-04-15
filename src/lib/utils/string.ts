export function urlJoin(...parts: string[]) {
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part.replace(/\/+$/g, ""); // Remove trailing slashes from the first part
      } else {
        return part.replace(/^\/+|\/+$/g, ""); // Remove leading and trailing slashes from other parts
      }
    })
    .filter((part) => part.length > 0) // Remove empty parts
    .join("/");
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );
}

/**
 * Removes the metadata prefix from a data URI string and returns only the payload.
 *
 * Example input: "data:image/png;base64,iVBORw0KGgo..."
 * Example output: "iVBORw0KGgo..."
 *
 * If the input does not follow the expected data URI format, the original string is returned.
 */
export const removeDataURIBase64Prefix = (dataURI: string) => {
  const separator = "base64,";
  const data = dataURI.split(separator);
  return data.length > 1 ? data[1] : dataURI; // Return the base64 data or original if it doesn't have the expected format
};

export function isNumeric(value: string) {
  return !isNaN(Number(value));
}
