import AccountSettings from "@/components/account-settings";
import Background from "@/components/background";
import EditProfileModal from "@/components/edit-profile-modal";
import Infos from "@/components/infos";
import ProfileAvatar from "@/components/profile-avatar";
import ProfileHeader from "@/components/profile-header";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";

import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Background>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20 }}
        >
          <ProfileHeader />
          <View className="items-center justify-center my-4 gap-5">
            <ProfileAvatar
              uri={user?.image_url ?? null}
              name={user?.name ?? ""}
            />
            <View className="items-center gap-2">
              {user && <Text className="text-white ">{user.name}</Text>}
              {user && <Text className="text-white ">{user.email}</Text>}
            </View>
            <View className="w-[90%]">
              <TouchableOpacity
                className="bg-[#8162FF] py-4 rounded-lg items-center"
                onPress={handleModal}
              >
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
      {isModalOpen && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <EditProfileModal HandleModal={handleModal} />
        </Modal>
      )}
    </>
  );
}
