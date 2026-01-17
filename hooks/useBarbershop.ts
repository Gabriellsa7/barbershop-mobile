import { useEffect, useState } from "react";

export type Barbershop = {
  id: string;
  name: string;
  address: string;
  description?: string;
  image_url?: string | null;
  rating?: number;
};

export function useBarbershop(id: string) {
  const [data, setData] = useState<Barbershop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBarbershop() {
      try {
        const res = await fetch(
          `http://192.168.0.19:3001/api/barbershop/${id}`,
        );
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Erro ao buscar barbershop:", e);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBarbershop();
  }, [id]);

  return { data, loading };
}
