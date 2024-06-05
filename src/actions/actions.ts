"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addPet(formData) {
  await prisma.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),
      age: +formData.get("age"),
      imageUrl:
        formData.get("imageUrl") ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      notes: formData.get("notes"),
    },
  });

  revalidatePath("/app", "layout");
}
// export async function deletePet(id: string) {
//   await prisma.pet.delete({
//     where: id === id,
//   });
// }
