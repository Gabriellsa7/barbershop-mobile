import Background from "@/components/background";
import Title from "@/components/title";
import { useAuth } from "@/contexts/auth-context";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { user, logout } = useAuth();
  return (
    <Background>
      <View className="flex-1 items-center justify-center">
        <Title>Profile Screen</Title>
        {user && <Text className="text-white mt-4">Olá, {user.name} 👋</Text>}
        <TouchableOpacity
          onPress={logout}
          className="bg-red-500 px-6 py-3 rounded-xl mt-6"
        >
          <Text className="text-white font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
