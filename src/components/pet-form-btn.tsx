import React from "react";
import { Button } from "./ui/button";

export default function PetFormBtn({
  actionType,
}: {
  actionType?: "edit" | "add";
}) {
  return (
    <Button className="mt-5 self-end" type="submit">
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
}
