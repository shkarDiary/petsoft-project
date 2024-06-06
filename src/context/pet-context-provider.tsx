"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import {
  createContext,
  Dispatch,
  SetStateAction,
  startTransition,
  useOptimistic,
  useState,
} from "react";
import { toast } from "sonner";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
  petsNumber: number;
  // setPets: Dispatch<SetStateAction<Pet[]>>;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddPet: (petData: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (id: string, petData: Omit<Pet, "id">) => Promise<void>;
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
    (state, newPet) => {
      return [...pets, { ...newPet, id: Math.random().toString() }];
    }
  );
  const [selectedPetId, setSelecetdPetId] = useState<string | null>(null);

  const petsNumber = optimisticPets.length;
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);

  const handleChangeSelectedPetId = (id: string) => {
    setSelecetdPetId(id);
  };
  const handleAddPet = async (petData: Omit<Pet, "id">) => {
    setOptimisticPets(petData);
    const error = await addPet(petData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (id: string, petData: Omit<Pet, "id">) => {
    const error = await editPet(id, petData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (id: string) => {
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
