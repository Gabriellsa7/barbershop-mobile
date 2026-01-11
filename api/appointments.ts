import { baseFetch } from "./baseFetch";

export async function createAppointment(data: {
  clientId: string;
  barbershopId: string;
  date: string;
  startTime: string;
  endTime: string;
  serviceIds: string[];
}) {
  return baseFetch("/appointment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
