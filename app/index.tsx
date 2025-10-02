import Background from "@/components/background";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <Background>
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../assets/Logo.png")}
          className="w-430 h-932 mb-4"
        />
        <View className="flex-col gap-6 py-5">
          <TouchableOpacity
            className="bg-[#8162FF] px-28 py-5 rounded-xl hover:bg-[#9378fe]"
            onPress={() => router.push("/signin")}
          >
            <Text className="text-white font-bold">Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#8162FF] px-28 py-5 rounded-xl"
            onPress={() => router.push("/signup")}
          >
            <Text className="text-white font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}
