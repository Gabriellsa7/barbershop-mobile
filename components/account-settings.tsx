import {
  Ban,
  Bell,
  ChevronRight,
  CircleUserRound,
  CreditCard,
} from "lucide-react-native";
import { Text, View } from "react-native";

export default function AccountSettings() {
  return (
    <View className=" mt-5 gap-4">
      <Text className="text-white">Account Settings</Text>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <CircleUserRound color="white" size={27} />
          <Text className="text-white">Personal Information</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <CreditCard color="white" size={27} />
          <Text className="text-white">Payment Options</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <Bell color="white" size={27} />
          <Text className="text-white">Notifications</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
      <View className="flex-row items-center justify-between bg-[#26272B] p-3 rounded-xl">
        <View className="flex-row items-center gap-4">
          <Ban color="white" size={27} />
          <Text className="text-white">Other</Text>
        </View>
        <ChevronRight color="white" size={20} />
      </View>
    </View>
  );
}
