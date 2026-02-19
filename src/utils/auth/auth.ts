export const AUTH_STORAGE_KEY = "pokedex-auth-user";
const DEFAULT_DEV_API_BASE_URL = "http://10.31.32.108:3000";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? DEFAULT_DEV_API_BASE_URL : window.location.origin)
).replace(/\/+$/, "");

export async function login(name: string, password: string) {
  const normalized = name.trim();

  if (!normalized) {
    return false;
  }

  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: normalized, password }),
  });

  if (!response.ok) {
    console.error("Login failed:", response.statusText);
    return false;
  }

  const data = await response.json();
  localStorage.setItem(AUTH_STORAGE_KEY, data.token);

  return true;
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export { API_BASE_URL };
