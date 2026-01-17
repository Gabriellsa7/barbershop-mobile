const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function baseFetch(input: string, init?: RequestInit) {
  const response = await fetch(`${BASE_URL}${input}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
}
