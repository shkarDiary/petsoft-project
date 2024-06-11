"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { petFormSchema, petIdSchema } from "@/lib/validations";

export async function addPet(petData: unknown) {
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
export async function deletePet(id: unknown) {
  await sleep(1000);
  const validatedId = petIdSchema.safeParse(id);
  if (!validatedId.success) {
    return {
      message: validatedId.error.message,
    };
  }
  await prisma.pet.delete({
    where: {
      id: validatedId.data,
    },
  });
  revalidatePath("/app", "layout");
}
export async function editPet(petId: unknown, petData: unknown) {
  await sleep(1000);
  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPet.success) {
    return {
      message: validatedPet.error.message,
    };
  }
  const validatedId = petIdSchema.safeParse(petId);
  if (!validatedId.success) {
    return {
      message: validatedId.error.message,
    };
  }
  try {
    await prisma.pet.update({
      where: {
        id: validatedId.data,
      },
      data: validatedPet,
    });
  } catch (e) {
    return { message: "Invalid id" };
  }
  revalidatePath("/app", "layout");
}
