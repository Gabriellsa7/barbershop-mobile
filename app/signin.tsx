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
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "expo-router";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const loggedUser = await login(email, password);
      console.log("✅ Login successful:", loggedUser.name);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.error("❌ Network error:", error);
      setErrorMessage(error.message || "Invalid email or password");
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

            {/* 🔴 Mensagem de erro */}
            {errorMessage ? (
              <Text className="text-red-500 mt-3">{errorMessage}</Text>
            ) : null}

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
