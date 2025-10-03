import { Image, View } from "react-native";

export default function Header() {
  return (
    <View className="p-8 border-b-2 border-b-gray-600">
      <Image
        source={require("../assets/LogoHeader.png")}
        width={32}
        height={32}
      />
    </View>
  );
}
