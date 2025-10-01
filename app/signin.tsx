import Background from "@/components/background";
import Title from "@/components/title";
import { View } from "react-native";

export default function Signin() {
  return (
    <Background>
      <View className="flex-1 items-center justify-center">
        <Title>Sign In Screen</Title>
      </View>
    </Background>
  );
}
