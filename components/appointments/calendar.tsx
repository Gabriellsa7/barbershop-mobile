import { Calendar } from "react-native-calendars";

interface AppointmentCalendarProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

export function AppointmentCalendar({
  selectedDate,
  onSelect,
}: AppointmentCalendarProps) {
  return (
    <Calendar
      onDayPress={(day) => onSelect(day.dateString)}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: "#8B5CF6",
        },
      }}
      theme={{
        backgroundColor: "#0F0F12",
        calendarBackground: "#0F0F12",
        dayTextColor: "#FFF",
        monthTextColor: "#FFF",
        arrowColor: "#FFF",
      }}
    />
  );
}
