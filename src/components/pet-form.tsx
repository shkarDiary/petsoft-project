"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { usePetContext } from "@/lib/hooks";
import { FormEvent } from "react";
import { addPet } from "@/actions/actions";

export default function PetForm({
  actionType,
  onFormSubmision,
}: {
  actionType?: "add" | "edit";
  onFormSubmision: () => void;
}) {
  const { selectedPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        onFormSubmision();
        await addPet(formData);
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
      <Button className="mt-5 self-end" type="submit">
        {actionType === "add" ? "Add a new pet" : "Edit pet"}
      </Button>
    </form>
  );
}
