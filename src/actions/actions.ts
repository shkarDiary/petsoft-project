"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(petData: Omit<Pet, "id">) {
  await sleep(2000);
  try {
    await prisma.pet.create({
      data: petData,
    });
  } catch (e) {
    return {
      message: `Could not add pet ${e}`,
    };
  }

  revalidatePath("/app", "layout");
}
export async function deletePet(id: string) {
  await prisma.pet.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/app", "layout");
}
export async function editPet(petId: string, petData: Omit<Pet, "id">) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: petData,
    });
  } catch (e) {
    return { message: "Invalid id" };
  }
  revalidatePath("/app", "layout");
}
