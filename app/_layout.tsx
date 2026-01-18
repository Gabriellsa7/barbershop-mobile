import { toastConfig } from "@/components/toast-config";
import { AuthProvider } from "@/contexts/auth-context";
import { DateProvider } from "@/contexts/date-context";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <DateProvider>
          <>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>

            <Toast config={toastConfig} />
          </>
        </DateProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}
