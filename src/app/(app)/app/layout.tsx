import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/context/pet-context-provider";
import SearchContextProvider from "@/context/search-context-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!res.ok) {
    throw new Error("Could not fetch pet");
  }
  const data: Pet[] = await res.json();
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col min-h-screen max-w-[1050px] mx-auto px-4 ">
        <AppHeader />
        <PetContextProvider data={data}>
          <SearchContextProvider>{children}</SearchContextProvider>
        </PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
