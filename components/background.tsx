import { ReactNode } from "react";
import { View } from "react-native";

type BackgroundProps = {
  children: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
  return (
    <View className="flex-1 items-center justify-center bg-[#221C3D]">
      {children}
    </View>
  );
}
