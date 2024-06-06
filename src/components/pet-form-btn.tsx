import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function PetFormBtn({ actionType }: { actionType?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="mt-5 self-end" type="submit">
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
}
