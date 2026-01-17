import { Button } from "@react-navigation/elements";
import {
  Ban,
  Bell,
  ChevronRight,
  CircleUserRound,
  CreditCard,
} from "lucide-react-native";
import { Alert, Linking, Text, View } from "react-native";

export default function AccountSettings() {
  const openManagerPanel = async () => {
    const url = "http://192.168.0.19:3000/login";

    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      Alert.alert("Erro", "Não foi possível abrir o painel");
      return;
    }

    await Linking.openURL(url);
  };
  return (
    <View className=" mt-5 gap-4">
      <Text className="text-white">Account Settings</Text>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <CircleUserRound color="white" size={27} />
          <Text className="text-white">Personal Information</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <CreditCard color="white" size={27} />
          <Text className="text-white">Payment Options</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <Bell color="white" size={27} />
          <Text className="text-white">Notifications</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <Ban color="white" size={27} />
          <Text className="text-white">
            <Button onPress={openManagerPanel}>Abrir painel web</Button>
          </Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
    </View>
  );
}
