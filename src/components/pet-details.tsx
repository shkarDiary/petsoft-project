"use client";
import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import PetButton from "./pet-button";

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  return (
    <section className=" flex flex-col  h-full w-full">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}
type PetProps = {
  pet: Pet;
};
function EmptyView() {
  return (
    <p className="tex-2xl font-medium h-full flex justify-center items-center ">
      No pet selected
    </p>
  );
}
function TopBar({ pet }: PetProps) {
  const { handleCheckoutPet } = usePetContext();
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        className="h-[75px] w-[75px] rounded-full object-cover"
        src={pet.imageUrl}
        alt=" "
        width={75}
        height={75}
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet.name}</h2>
      <div className="ml-auto space-x-2 ">
        <PetButton actionType={"edit"} />
        <PetButton
          onClick={() => handleCheckoutPet(pet.id)}
          actionType={"checkout"}
        />
      </div>
    </div>
  );
}
function Notes({ pet }: PetProps) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light ">
      {pet.notes}
    </section>
  );
}
function OtherInfo({ pet }: PetProps) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div className="">
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          owner name
        </h3>
        <p className=" mt-1 text-lg text-zinc-800 ">{pet.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">age</h3>
        <p className=" mt-1 text-lg text-zinc-800 ">{pet.age}</p>
      </div>
    </div>
  );
}
