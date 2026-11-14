import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface LoginRequest {
  identifier: string;
  password: string;
}

interface BackendLoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      role: "admin" | "customer";
    };
    token: string;
  };
}

const validateLoginRequest = (body: unknown): body is LoginRequest => {
  return (
    typeof body === "object" &&
    body !== null &&
    !Array.isArray(body) &&
    "identifier" in body &&
    "password" in body &&
    typeof body.identifier === "string" &&
    typeof body.password === "string" &&
    body.identifier.trim().length > 0 &&
    body.password.length > 0
  );
};

const validateBackendLoginResponse = (result: unknown): result is BackendLoginResponse => {
  return (
    typeof result === "object" &&
    result !== null &&
    "success" in result &&
    result.success === true &&
    "data" in result &&
    typeof result.data === "object" &&
    result.data !== null &&
    "token" in result.data &&
    typeof result.data.token === "string" &&
    "user" in result.data &&
    typeof result.data.user === "object" &&
    result.data.user !== null &&
    "id" in result.data.user &&
    typeof result.data.user.id === "string" &&
    "role" in result.data.user &&
    (result.data.user.role === "admin" || result.data.user.role === "customer")
  );
};

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!validateLoginRequest(body)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const backendResponse = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!backendResponse.ok) {
      if (backendResponse.status === 401) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      return NextResponse.json(
        { error: "Unable to authenticate" },
        {
          status:
            backendResponse.status >= 400 && backendResponse.status < 500
              ? backendResponse.status
              : 502,
        },
      );
    }

    const result: unknown = await backendResponse.json();

    if (!validateBackendLoginResponse(result)) {
      return NextResponse.json({ error: "Invalid authentication response" }, { status: 502 });
    }

    if (result.data.user.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const cookieStore = await cookies();

    cookieStore.set("food-project-token", result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    return NextResponse.json({
      success: true,
      data: {
        user: result.data.user,
      },
    });
  } catch {
    return NextResponse.json({ error: "Authentication service unavailable" }, { status: 502 });
  }
}
