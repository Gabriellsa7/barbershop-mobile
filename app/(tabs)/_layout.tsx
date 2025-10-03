import { Tabs } from "expo-router";
import { Calendar, House, User } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8162FF", // Active Color (purple-500)
        tabBarInactiveTintColor: "#FFFFFF", // Inactiver Color (white)
        tabBarStyle: {
          display: "flex",
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#141518", // Background Color (gray-900)
          borderTopColor: "#4b5563", // Border Color (gray-700)
          borderTopWidth: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
