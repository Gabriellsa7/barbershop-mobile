import BarbershopServiceModal from "@/components/service-modal";
import { useGetBarbershopService } from "@/hooks/useGetBarbershopService";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  barbershopId: string;
};

export default function BarbershopServices({ barbershopId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { data: services, loading } = useGetBarbershopService(
    barbershopId,
    refreshTrigger
  );

  if (loading) {
    return (
      <View className="py-6 px-5">
        <ActivityIndicator color="#8162FF" />
      </View>
    );
  }

  if (!services || services.length === 0) {
    return (
      <View className="py-6 px-5">
        <Text className="text-red-500">Service not Found</Text>
      </View>
    );
  }

  const handleModal = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <View className="flex-1">
      <ScrollView className="py-6 px-5 gap-3">
        <Text className="text-[#838896]">Services</Text>
        <View className="justify-center items-center relative">
          {services.map((service) => (
            <View
              key={service.id}
              className="flex-row items-center justify-center gap-3 p-3 max-w-[80%]"
            >
              <Image
                aria-label="BarberShoop image"
                source={{ uri: service.image_url || undefined }}
                className="w-[90px] h-[80px] rounded-xl"
                style={{ resizeMode: "cover" }}
              />

              <View className="gap-4 w-[80%]">
                <View className="gap-2">
                  <Text className="text-white text-sm font-bold">
                    {service.name}
                  </Text>
                  <Text className="text-[#838896]">{service.description}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-[#8162FF] font-bold">
                    R$ {service.price}
                  </Text>
                  <TouchableOpacity className="bg-[#26272B] py-3 px-8 rounded-xl">
                    <Text className="text-white text-sm font-bold">
                      Resevar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="w-full px-3 my-3">
        <TouchableOpacity
          className="bg-zinc-800 py-3 rounded-lg items-center fixed"
          onPress={handleModal}
        >
          <Text className="text-center text-white text-sm font-medium">
            Add BarberShop Service
          </Text>
        </TouchableOpacity>
      </View>
      {isOpen && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <BarbershopServiceModal
            HandleModal={handleModal}
            onSuccess={handleRefresh}
            barbershopId={barbershopId}
          />
        </Modal>
      )}
    </View>
  );
}
