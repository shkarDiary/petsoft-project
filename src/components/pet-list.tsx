"use client";
import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { searchValue } = useSearchContext();

  const filteredPetList = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <ul className="bg-white border-b border-light">
      {filteredPetList.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              "flex h-[70px] cursor-pointer items-center w-full px-5 text-base gap-3 transition hover:bg-[#EFF1F2] active:bg-[#EFF1F2]",
              { "bg-[#EFF1F2]": pet.id === selectedPetId }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="rounded-full w-[45px] h-[45px] object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
