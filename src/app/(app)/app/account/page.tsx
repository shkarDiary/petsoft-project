import { auth } from "@/auth";
import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/siggn-out-btn";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Page() {
  const sesseion = await auth();
  if (!sesseion?.user) {
    redirect("/login");
  }
  return (
    <main className="">
      <H1 className=" text-white my-8 ">Your Acount</H1>
      <ContentBlock className=" h-[500px] flex justify-center items-center ">
        <p>logged in as {sesseion?.user.email}</p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
