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

  useEffect(() => {
    const fetchBarbershops = async () => {
      try {
        const response = await fetch("http://192.168.0.7:3000/api/barbershop");
        const data: Barbershop[] = await response.json();
        setListBarbershop(data);
      } catch (error) {
        console.error("Erro ao buscar barbearias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBarbershops();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black px-4">
      <Text className="text-white text-2xl font-bold mb-4 mt-6">
        Barbearias Disponíveis
      </Text>

      {listBarbershop.map((barber) => (
        <View
          key={barber.id}
          className="bg-zinc-900 rounded-2xl mb-6 overflow-hidden"
        >
          <Image
            source={{ uri: barber.image_url }}
            className="w-full h-40"
            resizeMode="cover"
          />

          <View className="p-4">
            <View className="flex-row items-center mb-1">
              <Text className="text-purple-400 font-semibold text-sm mr-1">
                ★
              </Text>
              <Text className="text-white text-sm">
                {barber.rating?.toFixed(1) || "5.0"}
              </Text>
            </View>

            <Text className="text-white text-lg font-semibold">
              {barber.name}
            </Text>

            <Text className="text-zinc-400 text-sm mt-1">{barber.address}</Text>

            <TouchableOpacity
              className="bg-zinc-800 mt-4 py-3 rounded-xl"
              onPress={() => console.log("Reservar", barber.name)}
            >
              <Text className="text-center text-white font-medium">
                Reservar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
