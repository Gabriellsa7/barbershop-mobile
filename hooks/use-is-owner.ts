import { getBarbershopsByOwner } from "@/api/get-barbeshop-by-owner";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";

export function useIsOwner(barbershopId: string) {
  const { user } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function checkOwner() {
      if (!user) return;
      setLoading(true);
      const ownerShops = await getBarbershopsByOwner(user.id);
      setIsOwner(ownerShops.some((shop) => shop.id === barbershopId));
      setLoading(false);
    }

    checkOwner();
  }, [user, barbershopId]);

  return { isOwner, loading };
}
