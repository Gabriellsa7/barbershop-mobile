import Background from "@/components/background";
import ListBarbershop from "@/components/list-barbershop";
import { Text, View } from "react-native";

export default function Barbershop() {
  return (
    <Background>
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-2xl">Barbershop Screen</Text>
        <ListBarbershop />
      </View>
    </Background>
  );
}
