"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";
import { Pet } from "@prisma/client";
import { PetEssentials } from "@/lib/types";

type AddAction = {
  action: "add";
  payload: PetEssentials;
};

type EditAction = {
  action: "edit";
  payload: {
    id: Pet["id"];
    newPetData: PetEssentials;
  };
};

type DeleteAction = {
  action: "delete";
  payload: { id: Pet["id"] };
};

type Action = AddAction | EditAction | DeleteAction;

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  handleChangeSelectedPetId: (id: Pet["id"]) => void;
  selectedPet: Pet | undefined;
  petsNumber: number;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
  handleAddPet: (petData: PetEssentials) => Promise<void>;
  handleEditPet: (id: Pet["id"], petData: PetEssentials) => Promise<void>;
};
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  pets,
  children,
}: {
  children: React.ReactNode;
  pets: Pet[];
}) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    pets,
    (prev: Pet[], { action, payload }: Action): Pet[] => {
      switch (action) {
        case "add":
          return [
            ...pets,
            {
              ...payload,
              id: Math.random().toString(),
              updatedAt: new Date(),
              createdAt: new Date(),
            },
          ];
        case "edit":
          return prev.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData };
            }
            return pet;
          });
        case "delete":
          return prev.filter((pet) => pet.id !== payload.id);
      }
    }
  );
  const [selectedPetId, setSelecetdPetId] = useState<Pet["id"] | null>(null);

  const petsNumber = optimisticPets.length;
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);

  const handleChangeSelectedPetId = (id: Pet["id"]) => {
    setSelecetdPetId(id);
  };
  const handleAddPet = async (petData: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: petData });
    const error = await addPet(petData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (id: Pet["id"], petData: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id, newPetData: petData } });
    const error = await editPet(id, petData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (id: Pet["id"]) => {
    setOptimisticPets({ action: "delete", payload: { id } });
    await deletePet(id);
    setSelecetdPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        petsNumber,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
