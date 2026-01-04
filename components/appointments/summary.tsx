import { Text, View } from "react-native";

interface AppointmentSummaryProps {
  service: string;
  price: string;
  date: string;
  time: string;
  barber: string;
}

export function AppointmentSummary({
  service,
  price,
  date,
  time,
  barber,
}: AppointmentSummaryProps) {
  return (
    <View className="bg-zinc-900 rounded-xl p-4 mt-6">
      <View className="flex-row justify-between mb-2">
        <Text className="text-white font-semibold">{service}</Text>
        <Text className="text-white">R${price}</Text>
      </View>

      <Text className="text-zinc-400">Data: {date}</Text>
      <Text className="text-zinc-400">Horário: {time}</Text>
      <Text className="text-zinc-400">Barbearia: {barber}</Text>
    </View>
  );
}
