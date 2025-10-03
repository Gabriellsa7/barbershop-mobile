import { AuthProvider } from "@/contexts/auth-context";
import { DateProvider } from "@/contexts/date-context";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <DateProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Initial Page" }} />
            <Stack.Screen name="signin" options={{ title: "Signin" }} />
            <Stack.Screen name="signup" options={{ title: "Signup" }} />
          </Stack>
        </DateProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}
