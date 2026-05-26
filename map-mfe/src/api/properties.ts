import type { Property } from "@/types/property"

export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch("http://localhost:3001/api/properties")
  if (!res.ok) throw new Error("Failed to fetch properties")
  return res.json()
}
