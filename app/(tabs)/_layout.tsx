import { Tabs } from "expo-router";
import { House } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#06b6d4", // cor ativa (cyan-500)
        tabBarInactiveTintColor: "#9ca3af", // cor inativa (gray-400)
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
