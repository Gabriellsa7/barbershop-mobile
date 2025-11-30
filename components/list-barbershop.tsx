import { useAuth } from "@/contexts/auth-context";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Barbershop = {
  id: string;
  name: string;
  address: string;
  image_url?: string | null;
  rating?: number;
};

interface ListBarbershopProps {
  refreshTrigger?: number;
}

export default function ListBarbershop({
  refreshTrigger,
}: ListBarbershopProps) {
  const [listBarbershop, setListBarbershop] = useState<Barbershop[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const { user } = useAuth();

  const BASE_URL = "http://192.168.0.17:3001";

  const fetchBarbershops = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Busca barbearias do owner
      const ownerRes = await fetch(
        `${BASE_URL}/api/barbershop/owner/${user.id}`
      );
      const ownerList: Barbershop[] = await ownerRes.json();

      if (ownerList.length > 0) {
        setListBarbershop(ownerList);
        setIsOwner(true);
      } else {
        const allRes = await fetch(`${BASE_URL}/api/barbershop`);
        const allList: Barbershop[] = await allRes.json();
        setListBarbershop(allList);
        setIsOwner(false);
      }
    } catch (error) {
      console.error("Erro ao buscar barbearias:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBarbershops();
  }, [fetchBarbershops, refreshTrigger]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView className="px-4">
      <Text className="text-white text-2xl font-bold mb-4 mt-6 text-center">
        Barbearias Disponíveis
      </Text>

      <View className="flex-row flex-wrap ">
        {listBarbershop.map((barber) => (
          <View
            key={barber.id}
            className="bg-zinc-900 rounded-2xl mb-6 overflow-hidden"
            style={{
              width: "100%",
              alignSelf: "center",
            }}
          >
            {barber.image_url ? (
              <Image
                source={{ uri: barber.image_url }}
                style={{ width: "100%", height: 130 }}
                resizeMode="cover"
                onError={() =>
                  console.log("Erro ao carregar imagem:", barber.image_url)
                }
              />
            ) : (
              <View className="w-full h-32 bg-zinc-800 justify-center items-center">
                <Text className="text-zinc-500 text-sm">Sem imagem</Text>
              </View>
            )}

            <View className="p-3">
              <View className="flex-row items-center mb-1">
                <Text className="text-purple-400 font-semibold text-sm mr-1">
                  ★
                </Text>
                <Text className="text-white text-sm">
                  {barber.rating?.toFixed(1) || "5.0"}
                </Text>
              </View>

              <Text className="text-white text-base font-semibold">
                {barber.name}
              </Text>

              <Text className="text-zinc-400 text-xs mt-1">
                {barber.address}
              </Text>

              <TouchableOpacity
                className="bg-zinc-800 mt-3 py-2 rounded-lg"
                onPress={() =>
                  console.log(isOwner ? "See" : "Reservar", barber.name)
                }
              >
                <Text className="text-center text-white text-sm font-medium">
                  {isOwner ? "See" : "Reservar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
