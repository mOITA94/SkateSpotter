export async function getCroppedImg(imageSrc: string, crop: any, zoom: number) {
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); 
      image.src = url;
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const scale = image.naturalWidth / image.width;
  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x * scale,
    crop.y * scale,
    crop.width * scale,
    crop.height * scale,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise<File>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
      resolve(file);
    }, 'image/jpeg');
  });
}
