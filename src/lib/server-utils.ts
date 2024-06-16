import "server-only";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "./db";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function getPetById(id: string) {
  const pet = await prisma.pet.findUnique({
    where: {
      id,
    },
  });

  return pet;
}
