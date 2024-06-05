"use client";

import { addPet } from "@/actions/actions";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
  petsNumber: number;
  // setPets: Dispatch<SetStateAction<Pet[]>>;
  // handleCheckoutPet: (id: string) => void;
  // handleAddPet: (pet: Omit<Pet, "id">) => void;
  // handleEditPet: (id: string, pet: Omit<Pet, "id">) => void;
};
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  pets,
  children,
}: {
  children: React.ReactNode;
  pets: Pet[];
}) {
  // const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelecetdPetId] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  // const handleCheckoutPet = (id: string) => {
  //   setPets((prev) => prev.filter((pet) => pet.id !== id));
  //   setSelecetdPetId(null);
  // };
  const handleChangeSelectedPetId = (id: string) => {
    setSelecetdPetId(id);
  };
  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    // setPets((prev) => [
    //   ...prev,
    //   {
    //     id: Date.now().toString(),
    //     ...newPet,
    //   },
    // ]);
  };
  // const handleEditPet = (id: string, newPetData: Omit<Pet, "id">) => {
  //   setPets((prev) =>
  //     prev.map((pet) => {
  //       if (pet.id === id) {
  //         return {
  //           id: id,
  //           ...newPetData,
  //         };
  //       }
  //       return pet;
  //     })
  //   );
  // };
  const petsNumber = pets.length;

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        petsNumber,
        // setPets,
        // handleCheckoutPet,
        // handleAddPet,
        // handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
