import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  barbershopId?: string[];
};

type AuthContextProps = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load saved user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");

        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          router.replace("/(tabs)/home");
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error loading user:", error);
        router.replace("/");
      }
      setLoading(false);
    };
    loadUser();
  }, [router]);

  // Login
  const login = async (email: string, password: string) => {
    const response = await fetch("http://192.168.0.14:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      const user: User = data.user;

      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      router.replace("/(tabs)/home");
      return user;
    } else {
      throw new Error(data.error || "Login failed");
    }
  };

  // Logout
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    router.replace("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
