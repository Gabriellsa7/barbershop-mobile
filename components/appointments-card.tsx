import { Image, Text, View } from "react-native";

interface AppointementsCardProps {
  status: any;
  service: string;
  name: string;
  avatarUrl?: string | null;
  date: Date | any;
}

export default function AppointementsCard({
  status,
  service,
  name,
  avatarUrl,
  date,
}: AppointementsCardProps) {
  return (
    <View>
      <View>
        <Text>{status}</Text>
        <Text>{service}</Text>
        <View>
          <Image
            source={
              avatarUrl ? { uri: avatarUrl } : require("@/assets/favicon.png")
            }
            width={32}
            height={32}
            className="rounded-full"
          />
          <Text>{name}</Text>
        </View>
      </View>
      <View>
        <Text>{date}</Text>
      </View>
    </View>
  );
}
