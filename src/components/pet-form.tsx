"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";

type PetformProps = {
  actionType?: "add" | "edit";
  onFormSubmision: () => void;
};

export default function PetForm({ actionType, onFormSubmision }: PetformProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  return (
    <form
      name="shkar"
      action={async (formData) => {
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
          id="name"
          name="name"
          type="text"
          required
          defaultValue={actionType === "edit" ? selectedPet?.name : ""}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="ImageUrl">Image url</Label>
        <Input
          id="ImageUrl"
          name="ImageUrl"
          type="text"
          defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          required
          defaultValue={actionType === "edit" ? selectedPet?.age : ""}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="ownerName">Owner name</Label>
        <Input
          id="ownerName"
          name="ownerName"
          type="text"
          required
          defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          required
          defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
        />
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
