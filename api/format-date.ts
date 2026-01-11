export function formatDate(date: string) {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "Data inválida";
  }

  return d.toISOString().split("T")[0];
}
