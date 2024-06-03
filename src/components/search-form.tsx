"use client";

import { useSearchContext } from "@/lib/hooks";
import { ChangeEvent } from "react";

export default function SearchForm() {
  const { searchValue, setSearchValue } = useSearchContext();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <form action="" className="w-full h-full">
      <input
        onChange={handleOnChange}
        value={searchValue}
        type="search"
        className="w-full h-full bg-white/20 rounded-md  px-5 outline-none placeholder:text-white/50 transition focus:bg-white/50 hover:bg-white/30 "
        placeholder="search pets"
      />
    </form>
  );
}
