import { useEffect, useState } from "react";

export type BarbershopService = {
  id: string;
  name: string;
  description?: string;
  price: number;
  durationMinutes: number;
  barbershopId: string;
  image_url: string;
};

const url = "http://192.168.0.17:3001/api/service/";

export function useGetBarbershopService(
  barbershopId: string,
  refreshTrigger: number
) {
  const [data, setData] = useState<BarbershopService[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBarbershopService() {
      try {
        const res = await fetch(`${url}${barbershopId}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Barbershop service wasn't found", e);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    if (barbershopId) fetchBarbershopService();
  }, [barbershopId, refreshTrigger]);

  return { data, loading };
}
