import Background from "@/components/background";
import ListBarbershop from "@/components/list-barbershop";
import { View } from "react-native";

export default function Barbershop() {
  return (
    <Background>
      <View className="flex-1">
        <View className="flex-1">
          <ListBarbershop />
        </View>
      </View>
    </Background>
  );
}
