export const compressBase64Image = (
  base64: string,
  quality = 0.7,
  maxWidth = 1280,
  maxHeight = 1280,
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toDataURL("image/jpeg", quality); // compress here
      const compressed = canvas.toDataURL("image/jpeg", quality);

      resolve(compressed);
    };
  });
};
