import "server-only";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "./db";
import { Pet } from "@prisma/client";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function getPetById(id: Pet["id"]) {
  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  } catch (e) {
    console.log(e);
  }
}
export async function getPetByUserId(userId: Pet["userId"]) {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        userId,
      },
    });

    return pets;
  } catch (e) {
    console.log(e);
  }
}
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (e) {
    console.log(e);
  }
}
