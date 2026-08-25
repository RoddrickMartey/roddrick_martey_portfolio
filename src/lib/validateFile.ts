// src/lib/validateFile.ts

type ValidateFileOptions = {
  maxSizeMB: number
  allowedTypes: string[]
}

export function validateFile(
  file: File,
  { maxSizeMB, allowedTypes }: ValidateFileOptions
): string | null {
  if (!allowedTypes.includes(file.type)) {
    return `File must be one of: ${allowedTypes.join(", ")}`
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return `File must be smaller than ${maxSizeMB}MB`
  }

  return null // no error
}
