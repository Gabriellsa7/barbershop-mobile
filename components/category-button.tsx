import { Image, Text, TouchableOpacity } from "react-native";

interface CategoryButtonProps {
  title?: string;
  icon?: any;
}

export default function CategoryButton({ title, icon }: CategoryButtonProps) {
  return (
    <TouchableOpacity className="flex-row items-center gap-2 bg-[#1A1B1F] py-3 px-4 rounded-xl border-gray-600 border-hairline">
      <Image source={icon} />
      <Text className="text-white font-bold">{title}</Text>
    </TouchableOpacity>
  );
}
