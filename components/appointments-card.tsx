import { getDay } from "@/api/get-day";
import { getMonthName } from "@/api/get-month-name";
import { Image, Text, View } from "react-native";

interface AppointementsCardProps {
  status: any;
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
  return (
    <View
      className={`bg-[#1E1E26] rounded-xl p-4 mb-4 flex-row justify-between items-center w-full ${
        className ?? ""
      }`}
    >
      <View className="gap-3">
        <View className="bg-[#251f42] rounded-full p-1 items-center w-20">
          <Text className="text-[#8162FF] font-bold">{status}</Text>
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
