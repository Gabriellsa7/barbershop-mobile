import BarbershopServiceModal from "@/components/service-modal";
import { useAuth } from "@/contexts/auth-context";
import { Barbershop } from "@/hooks/useBarbershop";
import { useGetBarbershopService } from "@/hooks/useGetBarbershopService";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
  const [isOwner, setIsOwner] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const BASE_URL = "http://192.168.0.19:3001";

  // --- Checa se o usuário é owner ---
  const fetchOwnerStatus = useCallback(async () => {
    if (!user) return;

    try {
      const res = await fetch(`${BASE_URL}/api/barbershop/owner/${user.id}`);
      const ownerShops: Barbershop[] = await res.json();
      setIsOwner(ownerShops.some((shop) => shop.id === barbershopId));
    } catch (error) {
      console.error("Failed to check owner status:", error);
      setIsOwner(false);
    }
  }, [user, barbershopId]);

  useEffect(() => {
    fetchOwnerStatus();
  }, [fetchOwnerStatus, refreshTrigger]);

  if (loading) {
    return (
      <View className="py-6 px-5">
        <ActivityIndicator color="#8162FF" />
      </View>
    );
  }

  const isEmpty = !services || services.length === 0;

  const handleModal = () => setIsOpen((prev) => !prev);

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <View className="flex-1">
      <ScrollView className="py-6 px-5 gap-3">
        {isEmpty ? (
          <Text className="text-red-500">Service not Found</Text>
        ) : (
          <Text className="text-[#838896]">Services</Text>
        )}

        <View className="justify-center items-center relative">
          {services?.map((service) => (
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

                  <TouchableOpacity
                    onPress={() => {
                      if (isOwner) return;
                      router.replace({
                        pathname: "/barbershop/[id]/book-appointment",
                        params: { barbershopId, id: service.id },
                      });
                    }}
                    disabled={isOwner}
                    className={`py-3 px-8 rounded-xl ${
                      isOwner ? "bg-zinc-700" : "bg-[#26272B]"
                    }`}
                  >
                    <Text className="text-white text-sm font-bold">
                      {isOwner ? "See" : "Book Appointment"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {isOwner && (
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
      )}

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
