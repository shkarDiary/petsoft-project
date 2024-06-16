"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function addPet(petData: unknown) {
  const session = await auth();
  if (!session?.user) {
    return {
      message: "You must be logged in to add a pet",
    };
  }
  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPet.success) {
    return {
      message: validatedPet.error.message,
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        User: { connect: { id: session.user.id } },
      },
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

  //cheking authentication
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  //checking authorazation if the user is the owner of the pet
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedId.data,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "You are not the owner of this pet",
    };
  }

  if (!validatedId.success) {
    return {
      message: validatedId.error.message,
    };
  }

  await prisma.pet.delete({
    where: {
      id: validatedId.data,
      userId: session.user.id,
    },
  });
  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, petData: unknown) {
  await sleep(1000);
  const validatedPet = petFormSchema.safeParse(petData);
  const validatedId = petIdSchema.safeParse(petId);

  //cheking authentication
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  //checking authorazation if the user is the owner of the pet
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedId.data,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "You are not the owner of this pet",
    };
  }

  if (!validatedPet.success) {
    return {
      message: validatedPet.error.message,
    };
  }
  if (!validatedId.success) {
    return {
      message: validatedId.error.message,
    };
  }
  try {
    await prisma.pet.update({
      where: {
        id: validatedId.data,
        userId: session.user.id,
      },
      data: {
        ...validatedPet.data,
        User: { connect: { id: session.user.id } },
      },
    });
  } catch (e) {
    return { message: "Invalid id" };
  }
  revalidatePath("/app", "layout");
}
