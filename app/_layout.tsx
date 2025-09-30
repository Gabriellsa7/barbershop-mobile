import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Initial Page" }} />
        <Stack.Screen name="signin" options={{ title: "Signin" }} />
        <Stack.Screen name="signup" options={{ title: "Signup" }} />
      </Stack>
    </SafeAreaView>
  );
}
