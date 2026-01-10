import { useEffect, useState } from "react";

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
    appointmentId: string;
    serviceId: string;
  }[];
}

export function useGetAppointmentByUser(userId?: string) {
  const [data, setData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      const res = await fetch("http://192.168.0.17:3001/api/appointment/me", {
        credentials: "include",
      });

      const json = await res.json();
      setData(json);
      setLoading(false);
    }

    fetchAppointments();
  }, []);

  return { data, loading };
}
