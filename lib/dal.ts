import "server-only";

import { cookies } from "next/headers";

export interface AuthUser {
  id: string;
  role: "admin" | "customer";
}

interface UserMeResponse {
  user: AuthUser;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("food-project-token")?.value;

  if (!token) {
    return null;
  }

  const response = await fetch(`${process.env.BACKEND_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to retrieve authenticated user");
  }

  const result = (await response.json()) as UserMeResponse;

  return result.user;
}
