"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";
type TSearchContext = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};
export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}
