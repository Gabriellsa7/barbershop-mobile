import { useGetAppointmentByUser } from "@/api/use-get-appointmen-by-user";
import AppointementsCard from "@/components/appointments-card";
import Background from "@/components/background";
import CategoryButton from "@/components/category-button";
import Header from "@/components/header";
import { useAuth } from "@/contexts/auth-context";
import { useDate } from "@/contexts/date-context";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
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
  const { user } = useAuth();
  const { data: appointmentsData = [] } = useGetAppointmentByUser(
    user?.id || "",
  );

  const router = useRouter();

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
              appointmentsData.slice(0, 3).map((appointment) => {
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
