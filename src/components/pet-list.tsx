"use client";
import { usePetContext } from "@/lib/hooks";
import Image from "next/image";

export default function PetList() {
  const { pets } = usePetContext();

  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className="flex h-[70px] cursor-pointer items-center w-full px-5 text-base gap-3 transition hover:bg-[#EFF1F2] active:bg-[#EFF1F2]">
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
