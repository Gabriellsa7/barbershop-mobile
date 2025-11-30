import { Tabs } from "expo-router";
import { Calendar, House, Store, User } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8162FF",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: {
          display: "flex",
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#141518",
          borderTopColor: "#4b5563",
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
        name="barbershop"
        options={{
          title: "Barbershop",
          tabBarIcon: ({ color, size }) => <Store color={color} size={size} />,
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
