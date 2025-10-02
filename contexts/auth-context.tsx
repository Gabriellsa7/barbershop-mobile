import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
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

  // Load saved section
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("users");
        if (storedUsers) {
          const users: User[] = JSON.parse(storedUsers);

          // If want, you can storage the last signed
          const lastUser = users[users.length - 1];
          if (lastUser) {
            setUser(lastUser);
            router.replace("/(tabs)/home");
          } else {
            router.replace("/");
          }
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
    const response = await fetch("http://10.1.73.213:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Searching for saved users
      const user: User = data.user;
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      router.replace("/(tabs)/home");
      return user;
      // const storedUsers = await AsyncStorage.getItem("users");
      // const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      // // Replace if id already exists
      // const updatedUsers = [...users.filter((u) => u.id !== data.id), data];

      // await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
      // setUser(data);
      // router.replace("/(tabs)/home");
      // return data;
    } else {
      throw new Error(data.error || "Login failed");
    }
  };

  // Logout
  const logout = async () => {
    const storedUsers = await AsyncStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const updatedUsers = users.filter((u) => u.id !== user?.id);

    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
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
