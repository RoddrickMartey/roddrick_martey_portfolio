type ImageOptions = {
  width?: number
}

const CLOUDINARY_HOST = "res.cloudinary.com"

export function optimizeImage(url: string, options: ImageOptions = {}) {
  try {
    const imageUrl = new URL(url)

    if (
      imageUrl.hostname !== CLOUDINARY_HOST ||
      !imageUrl.pathname.includes("/image/upload/")
    ) {
      return url
    }

    const transformations = ["f_auto", "q_auto"]
    if (options.width) {
      transformations.push(`w_${options.width}`)
    }

    imageUrl.pathname = imageUrl.pathname.replace(
      "/image/upload/",
      `/image/upload/${transformations.join(",")}/`
    )

    return imageUrl.toString()
  } catch {
    return url
  }
}
