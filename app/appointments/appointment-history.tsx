import { useGetAppointmentByUser } from "@/api/use-get-appointmen-by-user";
import AppointementsCard from "@/components/appointments-card";
import Background from "@/components/background";
import Title from "@/components/title";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AppointmentHistory() {
  const { user } = useAuth();
  const {
    data: appointmentsData,
    loading,
    refetch,
  } = useGetAppointmentByUser(user?.id || "");
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Background>
        <Text className="text-white text-center mt-10">Loading...</Text>
      </Background>
    );
  }

  if (!appointmentsData.length) {
    return (
      <Background>
        <Text className="text-white text-center mt-10">
          No appointments found
        </Text>
      </Background>
    );
  }
  return (
    <Background>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        <View className="items-center justify-center gap-5 p-5">
          <View className="flex-row items-center w-full">
            <TouchableOpacity
              onPress={handleBack}
              className="bg-[#1A1B1F] p-2 rounded-xl"
            >
              <ChevronLeft color="white" />
            </TouchableOpacity>
            <View className="flex-1 items-center">
              <Title>Appointments</Title>
            </View>
            <View className="w-10" />
          </View>
          {appointmentsData.length === 0 ? (
            <Text className="text-white mt-2">Nenhum agendamento</Text>
          ) : (
            appointmentsData
              .filter(
                (appointment) =>
                  appointment.status !== "CONFIRMED" &&
                  appointment.status !== "PENDING",
              )
              .map((appointment) => {
                const services = appointment.appointmentservice;

                return (
                  <AppointementsCard
                    key={appointment.id}
                    name={appointment.barbershop.name}
                    avatarUrl={appointment.barbershop.image_url}
                    date={`${appointment.date.split("T")[0]}T${
                      appointment.startTime
                    }:00`}
                    startTime={appointment.startTime}
                    service={
                      services.length > 0
                        ? services.map((s) => s.service.name).join(", ")
                        : "Serviço não informado"
                    }
                    status={appointment.status}
                    className="w-full"
                  />
                );
              })
          )}
        </View>
      </ScrollView>
    </Background>
  );
}
