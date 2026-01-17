import { getDay } from "@/api/get-day";
import { getMonthName } from "@/api/get-month-name";
import { Image, Text, View } from "react-native";
import { AppointmentStatus } from "../config/entities/appointments/appointments.types";

interface AppointementsCardProps {
  status: AppointmentStatus;
  service: string;
  name: string;
  avatarUrl?: string | null;
  date: Date | any;
  startTime?: string;
  className?: string;
}

export default function AppointementsCard({
  status,
  service,
  name,
  avatarUrl,
  date,
  startTime,
  className,
}: AppointementsCardProps) {
  const bgClass =
    status === "PENDING"
      ? "bg-yellow-500/50"
      : status === "CONFIRMED"
        ? "bg-green-500/50"
        : status === "DONE"
          ? "bg-blue-500/50"
          : "bg-red-500/50";

  const textClass =
    status === "PENDING"
      ? "text-yellow-300"
      : status === "CONFIRMED"
        ? "text-green-300"
        : status === "DONE"
          ? "text-blue-300"
          : "text-red-300";

  return (
    <View
      className={`bg-[#1E1E26] rounded-xl p-4 mb-4 flex-row justify-between items-center ${
        className ?? ""
      }`}
    >
      <View className="gap-3">
        <View className={`rounded-full p-1 items-center w-24 ${bgClass}`}>
          <Text className={`font-bold text-sm ${textClass}`}>{status}</Text>
        </View>
        <Text className="text-white font-bold text-xl">{service}</Text>
        <View className="flex-row items-center gap-2">
          <Image
            source={
              avatarUrl ? { uri: avatarUrl } : require("@/assets/favicon.png")
            }
            width={32}
            height={32}
            className="rounded-full"
          />
          <Text className="text-white text-lg">{name}</Text>
        </View>
      </View>
      <View className="w-px h-full bg-[#2F2F3A] mx-4" />
      <View className="items-center gap-1 w-20">
        <Text className="text-[#838896]">{getMonthName(date)}</Text>

        <Text className="text-white text-3xl font-bold">{getDay(date)}</Text>

        <Text className="text-[#838896]">{startTime}</Text>
      </View>
    </View>
  );
}
