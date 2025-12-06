import Background from "@/components/background";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import BarbershopModal from "../barbershop/components/barbershop-modal";
import ListBarbershop from "../barbershop/components/list-barbershop";

export default function Barbershop() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      <Background>
        <View className="flex-1 ">
          <View className="flex-1">
            <ListBarbershop refreshTrigger={refreshTrigger} />
          </View>
          <View className="mx-4">
            <TouchableOpacity
              className="bg-zinc-800 mb-3 py-3 rounded-lg items-center"
              onPress={handleModal}
            >
              <Text className="text-center text-white text-sm font-medium">
                Add BarberShop
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>

      {isModalOpen && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <BarbershopModal
            HandleModal={handleModal}
            onSuccess={handleRefresh}
          />
        </Modal>
      )}
    </>
  );
}
