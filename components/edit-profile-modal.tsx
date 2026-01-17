import { useAuth } from "@/contexts/auth-context";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface EditProfileProps {
  HandleModal: () => void;
  onSuccess?: () => void;
}

export default function EditProfileModal({
  HandleModal,
  onSuccess,
}: EditProfileProps) {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://192.168.0.19:3001";

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert("Permission required", "Allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string): Promise<string | null> => {
    const formData = new FormData();

    const filename = uri.split("/").pop() || "image.jpg";
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image/jpeg";

    formData.append("image", { uri, name: filename, type } as any);

    try {
      const res = await fetch(`${BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) return null;

      const data = await res.json();
      let url = data.url;

      if (!url.startsWith("http")) {
        url = `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
      }

      return url;
    } catch (e) {
      console.error("Upload error:", e);
      return null;
    }
  };

  const handleConfirm = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name are required!");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User not authenticated!");
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl: string | undefined | null;

      if (imageUri) {
        finalImageUrl = await uploadImage(imageUri);
      }

      const bodyData = {
        name,
        image_url: finalImageUrl,
      };

      const response = await fetch(`${BASE_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.error || "Error Edit User Info.");
        return;
      }

      Alert.alert("Success", "User Info Edited!", [
        {
          text: "OK",
          onPress: () => {
            updateUser({
              name,
              image_url: finalImageUrl ?? user.image_url,
            });

            setName("");
            setImageUri(null);
            HandleModal();
            onSuccess && onSuccess();
          },
        },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Error Edit User Info.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-black/60 items-center justify-center px-6">
      <View className="bg-zinc-900 p-6 rounded-xl w-11/12 max-w-sm">
        <Text className="text-white text-lg font-semibold mb-4">
          Edit Profile
        </Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#ccc"
          className="bg-[#26272B] rounded-xl py-3 px-4 text-white mb-3"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity
          onPress={pickImage}
          className="bg-[#26272B] rounded-xl py-3 px-4 items-center justify-center"
        >
          {imageUri ? (
            <>
              <Image
                source={{ uri: imageUri }}
                className="w-full h-40 rounded-lg mb-2"
                resizeMode="cover"
              />
              <Text className="text-white text-sm">Trocar imagem</Text>
            </>
          ) : (
            <Text className="text-white">Selecionar imagem</Text>
          )}
        </TouchableOpacity>
        <View className="flex-row gap-3 mt-4">
          <TouchableOpacity
            className="bg-gray-600 flex-1 py-2 rounded-lg"
            onPress={HandleModal}
            disabled={loading}
          >
            <Text className="text-center text-white">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-purple-500 flex-1 py-2 rounded-lg"
            onPress={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-center text-white">Confirmar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
