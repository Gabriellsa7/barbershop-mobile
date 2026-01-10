export function calculateEndTime(
  startTime: string,
  durationMinutes: number
): string {
  const [hours, minutes] = startTime.split(":").map(Number);

  const start = new Date();
  start.setHours(hours, minutes, 0, 0);

  start.setMinutes(start.getMinutes() + durationMinutes);

  const endHours = String(start.getHours()).padStart(2, "0");
  const endMinutes = String(start.getMinutes()).padStart(2, "0");

  return `${endHours}:${endMinutes}`;
}
