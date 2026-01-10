import Background from "@/components/background";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { createAppointment } from "@/api/appointments";
import { AppointmentCalendar } from "@/components/appointments/calendar";
import { AppointmentSummary } from "@/components/appointments/summary";
import { TimeSlots } from "@/components/appointments/time-slots";
import { useAuth } from "@/contexts/auth-context";
import { calculateEndTime } from "@/hooks/calculate-end-time";
import { useBarbershop } from "@/hooks/useBarbershop";
import { useGetBarbershopService } from "@/hooks/useGetBarbershopService";

export default function BookAppointment() {
  const { barbershopId, id } = useLocalSearchParams<{
    barbershopId: string;
    id: string;
  }>();

  const { user, loading: authLoading } = useAuth();

  const { data: services, loading: servicesLoading } = useGetBarbershopService(
    barbershopId,
    0
  );

  const service = services?.find((s) => s.id === id);

  const { data, loading } = useBarbershop(barbershopId);

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<string>("2026-02-06");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const availableTimes = ["09:00", "09:45", "10:30", "11:15"];

  if (authLoading || loading || servicesLoading) {
    return (
      <Background>
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">Loading...</Text>
        </View>
      </Background>
    );
  }

  if (!user) {
    return (
      <Background>
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">User Not Authenticated</Text>
        </View>
      </Background>
    );
  }

  const handleConfirm = async () => {
    if (!selectedTime || !service?.durationMinutes) return;

    const endTime = calculateEndTime(selectedTime, service.durationMinutes);

    await createAppointment({
      clientId: user.id,
      barbershopId,
      date: selectedDate,
      startTime: selectedTime,
      endTime,
    });

    router.back();
  };

  return (
    <Background>
      <View className="relative">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#1A1B1F] absolute left-2 top-4 p-2 rounded-xl z-10"
        >
          <ChevronLeft color="white" />
        </TouchableOpacity>
      </View>

      <View className="mt-20 px-4">
        <Text className="text-white text-lg mb-4">Fazer Reserva</Text>

        <AppointmentCalendar
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />

        <TimeSlots
          times={availableTimes}
          selected={selectedTime}
          onSelect={setSelectedTime}
        />

        {selectedDate && selectedTime && (
          <AppointmentSummary
            service={service?.name || "Serviço"}
            price={service ? service.price.toFixed(2) : "0,00"}
            date={selectedDate}
            time={selectedTime}
            barber={data?.name || "Barbearia"}
          />
        )}

        <TouchableOpacity
          onPress={handleConfirm}
          disabled={!selectedTime}
          className={`mt-8 p-4 rounded-xl ${
            selectedTime ? "bg-violet-500" : "bg-zinc-700"
          }`}
        >
          <Text className="text-white text-center">Confirmar</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
