import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the App!</Text>
      <View>
        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
      </View>
    </View>
  );
}
