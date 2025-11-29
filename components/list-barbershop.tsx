import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 👇 Definindo o tipo dos dados que vêm do backend
type Barbershop = {
  id: string;
  name: string;
  address: string;
  image_url: string;
  rating?: number;
};

export default function ListBarbershop() {
  const [listBarbershop, setListBarbershop] = useState<Barbershop[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchBarbershops = async () => {
      if (!user) return;

      try {
        const responseOwner = await fetch(
          `http://192.168.0.14:3001/api/barbershop/owner/${user.id}`
        );
        const barbershopsOwner: Barbershop[] = await responseOwner.json();

        if (barbershopsOwner.length > 0) {
          setListBarbershop(barbershopsOwner);
          setIsOwner(true);
        } else {
          const responseAll = await fetch(
            `http://192.168.0.14:3001/api/barbershop`
          );
          const all: Barbershop[] = await responseAll.json();
          setListBarbershop(all);
        }
      } catch (error) {
        console.error("Erro ao buscar barbearias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBarbershops();
  }, [user]);

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

      <View className="flex-row flex-wrap gap-2">
        {listBarbershop.map((barber) => (
          <View
            key={barber.id}
            className="bg-zinc-900 rounded-2xl mb-6 overflow-hidden"
            style={{
              flex: 1,
              width: "50%",
              alignSelf: listBarbershop.length === 1 ? "center" : "auto",
            }}
          >
            <Image
              source={{ uri: barber.image_url }}
              style={{ width: "100%", height: 130 }}
            />

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
              {isOwner ? (
                <TouchableOpacity
                  className="bg-zinc-800 mt-3 py-2 rounded-lg"
                  onPress={() => console.log("See", barber.name)}
                >
                  <Text className="text-center text-white text-sm font-medium">
                    See
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="bg-zinc-800 mt-3 py-2 rounded-lg"
                  onPress={() => console.log("Reservar", barber.name)}
                >
                  <Text className="text-center text-white text-sm font-medium">
                    Reservar
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
