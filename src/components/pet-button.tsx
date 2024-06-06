"use client";
import { MouseEventHandler, useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { flushSync } from "react-dom";

export default function PetButton({
  actionType,
  onClick,
  disabled,
}: {
  actionType: "add" | "edit" | "checkout";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (actionType === "add" || actionType === "edit")
    return (
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size={"icon"}>
              <PlusIcon className="h-6 w-6" />
            </Button>
          ) : (
            <Button onClick={onClick} variant={"secondary"}>
              Edit
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "add" ? "Add a new pet" : "Edit pet"}
            </DialogTitle>
          </DialogHeader>
          <PetForm
            actionType={actionType}
            onFormSubmision={() => {
              flushSync(() => {
                setIsFormOpen(false);
              });
            }}
          />
        </DialogContent>
      </Dialog>
    );
  //   else if (actionType === "edit")
  //     return (
  //       <Button onClick={onClick} variant={"secondary"}>
  //         Edit
  //       </Button>
  //     );
  else if (actionType === "checkout")
    return (
      <Button disabled={disabled} onClick={onClick} variant={"destructive"}>
        checkout
      </Button>
    );
}
