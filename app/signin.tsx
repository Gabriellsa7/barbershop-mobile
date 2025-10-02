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

import Background from "@/components/background";
import Input from "@/components/input";
import Title from "@/components/title";
import { useRouter } from "expo-router";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://10.1.73.233:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Login successful:", data);
        router.replace("/(tabs)/home");
      } else {
        console.log("❌ Login failed:", data.error);
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

            {/* Forgot password */}
            <View className="items-end w-full mt-3">
              <Text className="text-white">Forgot your password?</Text>
            </View>

            {/* Button */}
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-[#8162FF] w-full py-4 rounded-xl mt-6"
            >
              <Text className="text-center text-white font-bold text-lg">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Background>
  );
}
