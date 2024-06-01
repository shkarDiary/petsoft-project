"use client";

import { createContext, useState } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
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
  const [selectedPetId, setSelecetdPetId] = useState(null);
  return (
    <PetContext.Provider value={{ pets, selectedPetId }}>
      {children}
    </PetContext.Provider>
  );
}
