import { useAuth } from "@/contexts/auth-context";
import { LogOutIcon } from "lucide-react-native";

import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileHeader() {
  const { logout } = useAuth();
  return (
    <View className="flex-row items-center justify-between ">
      <Text className="text-white font-bold text-xl text-center">Profile</Text>
      <TouchableOpacity
        onPress={logout}
        className="bg-red-500 px-3 py-3 rounded-xl"
      >
        <LogOutIcon color="white" />
      </TouchableOpacity>
    </View>
  );
}
