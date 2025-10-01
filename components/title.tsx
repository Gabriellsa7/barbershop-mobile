import { ReactNode } from "react";
import { Text } from "react-native";

type TitleProps = {
  children: ReactNode;
};

export default function Title({ children }: TitleProps) {
  return <Text className="text-white font-bold text-2xl">{children}</Text>;
}
