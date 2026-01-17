import Background from "@/components/background";
import Input from "@/components/input";
import Title from "@/components/title";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ registered successful:", data);
        router.replace("/signin");
      } else {
        console.log("❌ registration failed:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <Background>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 items-center justify-center px-9">
            {/* Logo */}
            <Image
              source={require("../assets/Logo.png")}
              className="w-430 h-932 mb-4"
              resizeMode="contain"
            />

            <Title>Welcome Back!</Title>

            {/* Inputs */}
            <View className="w-full mt-6 gap-6">
              <Input
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Button */}
            <TouchableOpacity
              onPress={handleSignup}
              className="bg-[#8162FF] w-full py-4 rounded-xl mt-6"
            >
              <Text className="text-center text-white font-bold text-lg">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Background>
  );
}
