import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export interface Appointment {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "DONE";
  createdAt: string;
  clientId: string;
  barbershopId: string;

  barbershop: {
    id: string;
    name: string;
    description: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
    image_url: string | null;
  };

  appointmentservice: {
    service: {
      id: string;
      name: string;
      price: number;
      durationMinutes: number;
    };
  }[];
}

export function useGetAppointmentByUser() {
  const [data, setData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    const res = await fetch("http://192.168.0.17:3001/api/appointment/me", {
      credentials: "include",
    });
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
    }, [])
  );

  return { data, loading };
}
