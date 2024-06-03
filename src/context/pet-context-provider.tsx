"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
  petsNumber: number;
  setPets: Dispatch<SetStateAction<Pet[]>>;
};
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: {
  children: React.ReactNode;
  data: Pet[];
}) {
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelecetdPetId] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  const handleChangeSelectedPetId = (id: string) => {
    setSelecetdPetId(id);
  };
  const petsNumber = pets.length;

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        petsNumber,
        setPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
