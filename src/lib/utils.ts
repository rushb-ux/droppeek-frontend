import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function fixImagePath(imagePath?: string): string {
  if (!imagePath) return "/default-thumbnail.png"
  if (imagePath.startsWith("http")) return imagePath
  return `/media/${imagePath.replace(/^\/?media\//, "")}`
}