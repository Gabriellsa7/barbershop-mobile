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
import Toast from "react-native-toast-message";

interface BarberShopServiceProps {
  HandleModal: () => void;
  onSuccess?: () => void;
  barbershopId: string;
}

export default function BarbershopServiceModal({
  HandleModal,
  onSuccess,
  barbershopId,
}: BarberShopServiceProps) {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceText, setPriceText] = useState("");
  const [price, setPrice] = useState(0);

  const [durationMinutes, setDurationMinutes] = useState(0);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://192.168.0.17:3001";

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
    if (!name.trim() || !price || !durationMinutes) {
      Alert.alert("Error", "Name, price and duration minutes are required!");
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
        description: description || undefined,
        price,
        durationMinutes,
        barbershopId,
        image_url: finalImageUrl,
      };

      const response = await fetch(`${BASE_URL}/api/service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.error || "Error creating barbershop service");
        return;
      }

      Toast.show({
        type: "success",
        text1: "Service created 🎉",
        text2: "Your Service was successfully created",
        position: "top",
      });

      setName("");
      setDescription("");
      setPrice(0);
      setDurationMinutes(0);
      setImageUri(null);
      HandleModal();
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Error creating barbershop service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <View className="bg-zinc-900 p-6 rounded-xl w-11/12 max-w-sm">
        <Text className="text-white text-lg font-semibold mb-4">
          Add BarberShop
        </Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#ccc"
          className="bg-[#26272B] rounded-xl py-3 px-4 text-white mb-3"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Description"
          placeholderTextColor="#ccc"
          className="bg-[#26272B] rounded-xl py-3 px-4 text-white mb-3"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <TextInput
          placeholder="Price"
          placeholderTextColor="#ccc"
          className="bg-[#26272B] rounded-xl py-3 px-4 text-white mb-3"
          keyboardType="numeric"
          maxLength={10}
          value={priceText}
          onChangeText={(text) => {
            let cleaned = text.replace(/[^0-9,]/g, "");

            const parts = cleaned.split(",");
            if (parts.length > 2) {
              cleaned = parts[0] + "," + parts[1];
            }

            if (cleaned.includes(",")) {
              const [int, dec] = cleaned.split(",");

              const limitedDec = dec ? dec.substring(0, 2) : "";

              cleaned = int + "," + limitedDec;
            }

            setPriceText(cleaned);

            const numeric = cleaned.replace(",", ".");
            setPrice(Number(numeric) || 0);
          }}
        />

        <TextInput
          placeholder="Duration Minutes"
          placeholderTextColor="#ccc"
          className="bg-[#26272B] rounded-xl py-3 px-4 text-white mb-3"
          keyboardType="numeric"
          maxLength={4}
          value={String(durationMinutes)}
          onChangeText={(text) => setDurationMinutes(Number(text))}
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
