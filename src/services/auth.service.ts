import httpClient from "../api/http-client";

export async function login(username: string, password: string) {
  const resp = await httpClient.post("/auth/login", {
    username: username,
    password: password,
  });
  localStorage.setItem("JWT", resp.data.token);
  return resp;
}

export function apiLogout() {
  localStorage.removeItem("JWT");
}
