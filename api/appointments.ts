import { baseFetch } from "./baseFetch";

export async function createAppointment(data: {
  clientId: string;
  barbershopId: string;
  date: string;
  startTime: string;
  endTime: string;
}) {
  return baseFetch("/appointment", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
