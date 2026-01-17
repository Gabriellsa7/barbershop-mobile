const BASE_URL = "http://192.168.0.19:3001/api";

export interface Barbershop {
  id: string;
  name: string;
  address: string;
  ownerId: string;
}

export async function getBarbershopsByOwner(
  ownerId: string,
): Promise<Barbershop[]> {
  try {
    const response = await fetch(`${BASE_URL}/barbershop/owner/${ownerId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch barbershops: ${response.statusText}`);
    }
    const data: Barbershop[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching owner's barbershops:", error);
    return [];
  }
}
