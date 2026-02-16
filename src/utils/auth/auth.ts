export const AUTH_STORAGE_KEY = "pokedex-auth-user";

export async function login(name: string, password: string) {
  const normalized = name.trim();

  if (!normalized) {
    return false;
  }

  const response = await fetch("http://localhost:3000/login", {
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
