"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PetformProps = {
  actionType?: "add" | "edit";
  onFormSubmision: () => void;
};
type TPetForm = {
  name: string;
  ownerName: string;
  age: string;
  imageUrl: string;
  notes: string;
};

const petFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 character long")
    .max(100, "Name must be at most 100 characters long"),
  ownerName: z
    .string()
    .trim()
    .min(1, "Owner name must be at least 1 character long")
    .max(100, "Owner name must be at most 20 characters long"),
  imageUrl: z.union([
    z.literal(
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"
    ),
    z.string().url().min(1, "Image url must be a valid url"),
  ]),
  age: z.coerce
    .number()
    .int()
    .positive("Age must be a positive number")
    .max(100),
  notes: z.union([z.literal(""), z.string().trim().max(1000)]),
});
export default function PetForm({ actionType, onFormSubmision }: PetformProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
  });

  return (
    <form
      action={async (formData) => {
        const res = await trigger();
        if (!res) {
          return;
        }
        onFormSubmision();

        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          age: +(formData.get("age") as string),
          imageUrl:
            (formData.get("ImageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          notes: formData.get("notes") as string,
        };
        console.log(formData.get("ImageUrl"));

        actionType === "add"
          ? await handleAddPet(petData)
          : await handleEditPet(selectedPet!.id, petData);
      }}
      className="space-y-3 flex flex-col"
    >
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          {...register("name", {
            required: true,
            maxLength: 20,
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters long",
            },
          })}
          id="name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="ownerName">Owner name</Label>
        <Input {...register("ownerName")} id="ownerName" />
        {errors.ownerName && (
          <p className="text-red-500">{errors.ownerName.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="imageUrl">Image url</Label>
        <Input {...register("imageUrl")} id="imageUrl" />
        {errors.imageUrl && (
          <p className="text-red-500">{errors.imageUrl.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input
          {...register("age", { required: true, valueAsNumber: true })}
          type="number"
          id="age"
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea {...register("notes", { required: true })} id="notes" />
        {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
