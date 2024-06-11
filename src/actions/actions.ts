"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { petFormSchema } from "@/lib/validations";

export async function addPet(petData: PetEssentials) {
  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPet.success) {
    return {
      message: validatedPet.error.message,
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (e) {
    return {
      message: `Could not add pet ${e}`,
    };
  }

  revalidatePath("/app", "layout");
}
export async function deletePet(id: Pet["id"]) {
  await sleep(1000);

  await prisma.pet.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/app", "layout");
}
export async function editPet(petId: Pet["id"], petData: PetEssentials) {
  await sleep(1000);

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
