import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Home</Text>
      <Link href="/signin">Sign In</Link>
      <Link href="/signup">Sign Up</Link>
    </SafeAreaView>
  );
}
