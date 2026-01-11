import { useGetAppointmentByUser } from "@/api/use-get-appointmen-by-user";
import AppointementsCard from "@/components/appointments-card";
import Background from "@/components/background";
import CategoryButton from "@/components/category-button";
import Header from "@/components/header";
import { useAuth } from "@/contexts/auth-context";
import { useDate } from "@/contexts/date-context";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const { dataAtual } = useDate();
  const { data: appointmentsData = [] } = useGetAppointmentByUser();

  const { user } = useAuth();
  return (
    <Background>
      <Header />
      <View className="px-5 py-6">
        <View className="gap-1">
          <Text className="text-white text-xl font-bold">
            Hello, {user?.name}
          </Text>
          <Text className="text-white">{dataAtual}</Text>
        </View>
        <View className="flex-row items-center justify-between gap-3 pt-6 pb-3">
          <TextInput
            placeholder="Search for a barber"
            className="bg-[#1A1B1F] rounded-xl py-3 px-4 w-[85%] placeholder:text-white"
          />
          <TouchableOpacity>
            <Image
              width={50}
              height={50}
              source={require("../../assets/search.png")}
            />
          </TouchableOpacity>
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
        <View className="pb-4">
          <Text className="text-[#838896] text-xl font-bold">
            Appointements
          </Text>
          {appointmentsData.length === 0 ? (
            <Text className="text-white mt-2">Nenhum agendamento</Text>
          ) : (
            appointmentsData.map((appointment) => {
              const services = appointment.appointmentservice;

              return (
                <AppointementsCard
                  key={appointment.id}
                  name={appointment.barbershop.name}
                  avatarUrl={services[0]?.service.image_url || null}
                  date={`${appointment.date} ${appointment.startTime}`}
                  service={
                    services.length > 0
                      ? services.map((s) => s.service.name).join(", ")
                      : "Serviço não informado"
                  }
                  status={appointment.status}
                />
              );
            })
          )}
        </View>
        <View className="pb-4">
          <Text className="text-[#838896] text-xl font-bold">Recommended</Text>
          {/* <AppointementsCard name={} avatarUrl={} date={} service={} status={} /> */}
        </View>
        <View className="pb-4">
          <Text className="text-[#838896] text-xl font-bold">Popular</Text>
        </View>
      </View>
    </Background>
  );
}
