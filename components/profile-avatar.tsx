import { useState } from "react";
import { Image, Text, View } from "react-native";

type ProfileAvatarProps = {
  uri?: string | null;
  name: string;
};

export default function ProfileAvatar({ uri, name }: ProfileAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ");

    const first = parts[0]?.charAt(0).toUpperCase() ?? "";
    const second = parts[1]?.charAt(0).toUpperCase() ?? "";

    return first + second;
  };

  const initials = getInitials(name);
  const showImage = !!uri && !imageError;

  return (
    <View className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white">
      {showImage ? (
        <Image
          source={{ uri }}
          onError={() => setImageError(true)}
          resizeMode="cover"
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <View className="absolute inset-0 bg-[#1C84FF] items-center justify-center">
          <Text className="text-white font-bold text-4xl tracking-widest">
            {initials}
          </Text>
        </View>
      )}
    </View>
  );
}
