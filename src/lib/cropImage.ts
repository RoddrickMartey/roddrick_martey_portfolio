type CropArea = { x: number; y: number; width: number; height: number }

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.src = url
  })
}

/**
 * Crops an image to the given pixel area and returns a base64 data URI.
 */
export async function getCroppedImageBase64(
  imageSrc: string,
  cropAreaPixels: CropArea,
  outputSize = 512
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("Could not get canvas context")
  }

  canvas.width = outputSize
  canvas.height = outputSize

  ctx.drawImage(
    image,
    cropAreaPixels.x,
    cropAreaPixels.y,
    cropAreaPixels.width,
    cropAreaPixels.height,
    0,
    0,
    outputSize,
    outputSize
  )

  return canvas.toDataURL("image/jpeg", 0.9)
}
