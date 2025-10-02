import { AuthProvider } from "@/contexts/auth-context";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: "Initial Page" }} />
          <Stack.Screen name="signin" options={{ title: "Signin" }} />
          <Stack.Screen name="signup" options={{ title: "Signup" }} />
        </Stack>
      </AuthProvider>
    </SafeAreaView>
  );
}
