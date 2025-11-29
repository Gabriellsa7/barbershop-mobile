import Background from "@/components/background";
import ListBarbershop from "@/components/list-barbershop";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function Barbershop() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => setIsModalOpen(true);

  return (
    <>
      <Background>
        <View className="flex-1">
          <View className="flex-1">
            <ListBarbershop />
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
          <View
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <View className="bg-zinc-900 p-6 rounded-xl w-11/12 max-w-sm">
              <Text className="text-white text-lg font-semibold mb-4">
                Add BarberShop
              </Text>

              <TouchableOpacity
                className="bg-purple-500 py-2 rounded-lg mt-3"
                onPress={() => setIsModalOpen(false)}
              >
                <Text className="text-center text-white">Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
