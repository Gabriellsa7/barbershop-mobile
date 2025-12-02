import { Calendar, ChevronRight, Store } from "lucide-react-native";
import { Text, View } from "react-native";

export default function Infos() {
  return (
    <View className=" mt-5 gap-4">
      <Text className="text-white">Other</Text>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <Calendar color="white" size={27} />
          <Text className="text-white">Appointments</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <Store color="white" size={27} />
          <Text className="text-white">Barbershop</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
      {/* <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <CircleUserRound color="white" size={27} />
          <Text className="text-white">Recommended</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <CircleUserRound color="white" size={27} />
          <Text className="text-white">Popular</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View> */}
    </View>
  );
}
