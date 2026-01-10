import { formatDate } from "@/api/format-date";
import { useGetAppointmentByUser } from "@/api/use-get-appointmen-by-user";
import Background from "@/components/background";
import Title from "@/components/title";
import { Text, View } from "react-native";

export default function Appointments() {
  const { data, loading } = useGetAppointmentByUser();

  if (loading) {
    return (
      <Background>
        <Text className="text-white text-center mt-10">Loading...</Text>
      </Background>
    );
  }

  if (!data.length) {
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
      <View className="items-center justify-center gap-5 py-5">
        <Title>Appointments</Title>
        {data.map((appointments) => (
          <View
            key={appointments.id}
            className="bg-zinc-800 p-4 mb-4 rounded-lg w-11/12"
          >
            <Text className="text-white text-lg font-medium mb-2">
              Barbershop Name: {appointments.barbershop.name}
            </Text>
            <Text className="text-white text-lg font-medium mb-2">
              Appointment Day: {formatDate(appointments.date)} at{" "}
              {appointments.startTime}
            </Text>
          </View>
        ))}
      </View>
    </Background>
  );
}
