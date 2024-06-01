import { PetContext } from "@/context/pet-context-provider";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePathContext must be used within a PetContextProvider");
  }
  return context;
}