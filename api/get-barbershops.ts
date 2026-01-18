import { Barbershop } from "@/config/entities/barbershop/barbershop.types";
import { useEffect, useState } from "react";

export function useBarbershops() {
  const [data, setData] = useState<Barbershop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBarbershops() {
      try {
        const res = await fetch("http://192.168.0.19:3001/api/barbershop");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchBarbershops();
  }, []);

  return { data, loading };
}
