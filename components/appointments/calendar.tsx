import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface AppointmentCalendarProps {
  selectedDate: string;
  onSelect: (date: string) => void;
  minDate: string;
}

export function AppointmentCalendar({
  selectedDate,
  onSelect,
  minDate,
}: AppointmentCalendarProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value === 5 ? 1 : 0.95,
  }));

  const Content = (
    <Animated.View style={[styles.glass, animatedStyle]}>
      <LinearGradient
        colors={["rgba(255,255,255,0.12)", "rgba(255,255,255,0.04)"]}
        style={styles.gradient}
      >
        <Calendar
          minDate={minDate}
          onDayPress={(day) => onSelect(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "rgba(139, 92, 246, 0.95)",
            },
          }}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            dayTextColor: "#FFFFFF",
            monthTextColor: "#FFFFFF",
            arrowColor: "#FFFFFF",
            todayTextColor: "#A78BFA",
            selectedDayTextColor: "#FFFFFF",
            textDisabledColor: "rgba(255,255,255,0.3)",
          }}
        />
      </LinearGradient>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.97))}
        onPressOut={() => (scale.value = withSpring(1))}
      >
        {Platform.OS === "ios" ? (
          <BlurView intensity={70} tint="dark" style={styles.blur}>
            {Content}
          </BlurView>
        ) : (
          <View style={styles.androidFallback}>{Content}</View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  blur: {
    borderRadius: 24,
    overflow: "hidden",
  },

  glass: {
    borderRadius: 24,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 28,
    elevation: 12,
  },

  gradient: {
    padding: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },

  androidFallback: {
    backgroundColor: "#16161A",
    borderRadius: 24,
  },
});
