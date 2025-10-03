import { ReactNode } from "react";
import { View } from "react-native";

type BackgroundProps = {
  children: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
  return <View className="flex-1 bg-[#141518]">{children}</View>;
}
