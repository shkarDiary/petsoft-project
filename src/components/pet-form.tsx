"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constant";
import { petFormSchema } from "@/lib/validations";

type PetformProps = {
  actionType?: "add" | "edit";
  onFormSubmision: () => void;
};

export default function PetForm({ actionType, onFormSubmision }: PetformProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof petFormSchema>>({
    resolver: zodResolver(petFormSchema),
  });

  return (
    <form
      action={async () => {
        const res = await trigger();
        if (!res) {
          return;
        }
        onFormSubmision();

        const petData = getValues();

        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

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
