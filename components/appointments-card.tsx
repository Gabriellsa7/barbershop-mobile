import { Image, Text, View } from "react-native";

interface AppointementsCardProps {
  status: any;
  service: string;
  name: string;
  avatarUrl: any;
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
            source={avatarUrl}
            width={32}
            height={32}
            className="rounded-full"
          />
          <Text>{name}</Text>
        </View>
      </View>
      <View>{date}</View>
    </View>
  );
}
