import { Text, TouchableOpacity, View } from "react-native";

interface TimeSlotsProps {
  times: string[];
  selected: string;
  onSelect: (time: string) => void;
}

export function TimeSlots({ times, selected, onSelect }: TimeSlotsProps) {
  return (
    <View className="flex-row flex-wrap gap-3 mt-4">
      {times.map((time) => {
        const isSelected = time === selected;

        return (
          <TouchableOpacity
            key={time}
            onPress={() => onSelect(time)}
            className={`px-4 py-2 rounded-full border ${
              isSelected ? "bg-violet-500 border-violet-500" : "border-zinc-700"
            }`}
          >
            <Text className="text-white">{time}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
