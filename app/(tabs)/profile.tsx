import AccountSettings from "@/components/account-settings";
import Background from "@/components/background";
import Infos from "@/components/infos";
import ProfileAvatar from "@/components/profile-avatar";
import ProfileHeader from "@/components/profile-header";
import { useAuth } from "@/contexts/auth-context";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { user } = useAuth();
  return (
    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <ProfileHeader />
        <View className="items-center justify-center my-4 gap-5">
          <ProfileAvatar uri={user?.imageUrl ?? null} name={user?.name ?? ""} />
          <View className="items-center gap-2">
            {user && <Text className="text-white ">{user.name}</Text>}
            {user && <Text className="text-white ">{user.email}</Text>}
          </View>
          <View className="w-[90%]">
            <TouchableOpacity className="bg-[#8162FF] py-4 rounded-lg items-center">
              <Text className="text-center text-white text-sm font-medium">
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <AccountSettings />
        <Infos />
      </ScrollView>
    </Background>
  );
}
