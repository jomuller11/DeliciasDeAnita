"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string } | null> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { error: "Usuario o contraseña incorrectos" };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", process.env.ADMIN_SESSION_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
