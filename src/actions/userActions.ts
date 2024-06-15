"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function logIn(formData: FormData) {
  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());
  const hashedPassword = await bcrypt.hash(authData.password as string, 10);
  await prisma.user.create({
    data: {
      email: authData.email as string,
      hashedPassword: hashedPassword,
    },
  });
  await signIn("credentials", formData);
}
