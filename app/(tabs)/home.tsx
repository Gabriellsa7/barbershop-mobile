import { useBarbershops } from "@/api/get-barbershops";
import { useGetAppointmentByUser } from "@/api/use-get-appointmen-by-user";
import AppointementsCard from "@/components/appointments-card";
import Background from "@/components/background";
import CategoryButton from "@/components/category-button";
import Header from "@/components/header";
import { useAuth } from "@/contexts/auth-context";
import { useDate } from "@/contexts/date-context";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const { dataAtual } = useDate();
  const [search, setSearch] = useState("");

  const { user } = useAuth();
  const {
    data: appointmentsData = [],

    refetch,
  } = useGetAppointmentByUser(user?.id || "");

  const router = useRouter();

  const { data: barbershops } = useBarbershops();

  const filteredBarbershops = barbershops.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase()),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Background>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-5 py-6">
          <View className="gap-1">
            <Text className="text-white text-xl font-bold">
              Hello, {user?.name}
            </Text>
            <Text className="text-white">{dataAtual}</Text>
          </View>
          <View className="pt-6 pb-3">
            {/* Wrapper relativo */}
            <View className="relative w-full items-center">
              <TextInput
                placeholder="Search for a barber"
                placeholderTextColor="#9CA3AF"
                className="bg-[#1A1B1F] rounded-xl py-3 px-4 w-full text-white "
                value={search}
                onChangeText={setSearch}
              />

              {search.length > 0 && (
                <View
                  className="absolute top-[40px] w-[85%] bg-[#1A1B1F] rounded-xl z-50"
                  style={{
                    maxHeight: 260,
                    elevation: 10,
                  }}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                  >
                    {filteredBarbershops.length === 0 ? (
                      <Text className="text-white text-center py-4">
                        Nenhuma barbearia encontrada
                      </Text>
                    ) : (
                      filteredBarbershops.map((barber) => (
                        <TouchableOpacity
                          key={barber.id}
                          className="flex-row gap-3 items-center p-4 border-b border-[#2A2B30]"
                          onPress={() => {
                            setSearch("");
                            router.push(`/barbershop/${barber.id}/details`);
                          }}
                        >
                          {barber.image_url && (
                            <Image
                              source={{ uri: barber.image_url }}
                              className="w-12 h-12 rounded-full"
                            />
                          )}

                          <View className="flex-1">
                            <Text className="text-white font-bold text-base">
                              {barber.name}
                            </Text>
                            <Text
                              className="text-gray-400 text-sm"
                              numberOfLines={1}
                            >
                              {barber.address}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    )}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>

          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              paddingVertical: 10,
            }}
            showsHorizontalScrollIndicator={false}
          >
            <CategoryButton
              title="Cabelo"
              icon={require("../../assets/icons/scissors.png")}
            />
            <CategoryButton
              title="Barba"
              icon={require("../../assets/icons/mustache.png")}
            />
            <CategoryButton
              title="Aparamento"
              icon={require("../../assets/icons/razordoubleedge.png")}
            />
            <CategoryButton
              title="Sobrancelha"
              icon={require("../../assets/icons/mingcute_eyebrow.png")}
            />
          </ScrollView>
          <View className="pb-4">
            <Image
              source={require("../../assets/banner.png")}
              className="w-full h-40 rounded-xl mt-4"
            />
          </View>
          <View className="pb-4 gap-3">
            <View className="flex-row justify-between">
              <Text className="text-[#838896] text-xl font-bold">
                Appointements
              </Text>
              <Text
                onPress={() => router.push("/appointments")}
                className="font-bold text-lg text-[#8162FF] "
              >
                See All
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 12,
                paddingVertical: 8,
                paddingRight: 16,
              }}
            >
              {appointmentsData.length === 0 ? (
                <Text className="text-white mt-2">Nenhum agendamento</Text>
              ) : (
                appointmentsData
                  .slice(0, 3)
                  .filter(
                    (appointment) =>
                      appointment.status !== "DONE" &&
                      appointment.status !== "CANCELLED",
                  )
                  .map((appointment) => {
                    const services = appointment.appointmentservice;

                    return (
                      <AppointementsCard
                        key={appointment.id}
                        name={appointment.barbershop.name}
                        avatarUrl={appointment.barbershop.image_url}
                        date={`${appointment.date.split("T")[0]}T${
                          appointment.startTime
                        }:00`}
                        startTime={appointment.startTime}
                        service={
                          services.length > 0
                            ? services.map((s) => s.service.name).join(", ")
                            : "Serviço não informado"
                        }
                        status={appointment.status}
                        className="w-[330px]"
                      />
                    );
                  })
              )}
              <TouchableOpacity
                onPress={() => router.push("/appointments")}
                className="w-[40px] h-[40px] rounded-lg bg-violet-500 items-center justify-center self-center"
                activeOpacity={0.8}
              >
                <Text className="text-white text-3xl font-bold">
                  <Plus color="white" />
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View className="pb-4">
            <Text className="text-[#838896] text-xl font-bold">
              Recommended
            </Text>
            {/* <AppointementsCard name={} avatarUrl={} date={} service={} status={} /> */}
          </View>
          <View className="pb-4">
            <Text className="text-[#838896] text-xl font-bold">Popular</Text>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
