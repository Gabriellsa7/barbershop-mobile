import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/signin">Sign In</Link>
      <Link href="/signup">Sign Up</Link>
    </View>
  );
}
