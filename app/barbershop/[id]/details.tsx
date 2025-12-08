import Background from "@/components/background";
import { useBarbershop } from "@/hooks/useBarbershop";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, MapPinIcon, StarIcon } from "lucide-react-native";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BarbershopServices from "../components/barbershop-services";

export default function BarbershopDetails() {
  const { id } = useLocalSearchParams();
  const { data: barber, loading } = useBarbershop(id as string);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Background>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Background>
    );
  }

  if (!barber) {
    return (
      <Background>
        <View className="p-5">
          <Text className="text-white">Barbearia não encontrada.</Text>
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <View className="relative">
        <TouchableOpacity
          onPress={handleBack}
          className="bg-[#1A1B1F] absolute left-2 top-4 p-2 rounded-xl z-10"
        >
          <ChevronLeft color="white" />
        </TouchableOpacity>

        <Image
          aria-label="BarberShoop image"
          source={{ uri: barber.image_url || undefined }}
          className="w-full"
          style={{ height: 250, resizeMode: "cover" }}
        />
      </View>
      <View className="p-5 gap-4">
        <Text className="text-white font-bold text-xl">{barber.name}</Text>
        <View className="gap-3">
          <View className="flex-row items-center gap-3">
            <MapPinIcon color="#8162FF" size={16} />
            <Text className="text-white text-sm">{barber.address}</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <StarIcon color="#8162FF" size={16} />
            <Text className="text-white text-sm">
              {barber.rating || "no rating yet"}
            </Text>
          </View>
        </View>
      </View>
      <View className="border-[#26272B] border-[1px]" />
      <View className="py-6 px-5 gap-3">
        <Text className="text-[#838896]">About us</Text>
        <Text className="text-white text-sm">{barber.description}</Text>
      </View>
      <View className="border-[#26272B] border-[1px]" />
      <BarbershopServices barbershopId={barber.id} />
    </Background>
  );
}
