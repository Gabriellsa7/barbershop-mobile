import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="gap-2">
      <Text className="text-white">{label}</Text>
      <View className="flex-row items-center bg-white rounded-xl px-3">
        <TextInput
          className="flex-1 py-4 text-black"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor="#6B7280"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={20} color="black" />
            ) : (
              <Eye size={20} color="black" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
