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

export function getRoles(): string[] | undefined {
  const token = localStorage.getItem("JWT");
  // we want only the payload (and "." are not usable in atob)
  if (token) {
    const encryptedPayload = token.split(".")[1];
    // Decode payload from Base64 and convert it as a JSON
    const payload = JSON.parse(atob(encryptedPayload));
    // This syntax is weak, we should've used a model here
    // But this is not the exercise's focus
    return payload.scope.split(" ");
  }
}

export function hasSomeRole(role: string | string[]): boolean {
  const roles = getRoles();
  if (roles) {
    if (Array.isArray(role)) {
      return role.some((r) => roles.includes(r));
    } else {
      return roles.includes(role);
    }
  }
  return false;
}

export function hasEveryRoles(role: string | string[]): boolean {
  const roles = getRoles();
  if (roles) {
    if (Array.isArray(role)) {
      return role.every((r) => roles.includes(r));
    } else {
      return roles.includes(role);
    }
  }
  return false;
}
