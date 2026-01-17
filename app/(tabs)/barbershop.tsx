import { useGetAppointmentByUser } from "@/api/use-get-appointmen-by-user";
import Background from "@/components/background";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { Modal, RefreshControl, ScrollView, View } from "react-native";
import BarbershopModal from "../barbershop/components/barbershop-modal";
import ListBarbershop from "../barbershop/components/list-barbershop";

export default function Barbershop() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user } = useAuth();

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

  const { loading, refetch } = useGetAppointmentByUser(user?.id || "");

  return (
    <Background>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        <View className="flex-1 ">
          <View className="flex-1">
            <ListBarbershop refreshTrigger={refreshTrigger} />
          </View>
        </View>
      </ScrollView>
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
    </Background>
  );
}
