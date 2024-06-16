import { auth } from "@/auth";
import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/siggn-out-btn";
import { checkAuth } from "@/lib/server-utils";

export default async function Page() {
  const session = await checkAuth();

  return (
    <main className="">
      <H1 className=" text-white my-8 ">Your Acount</H1>
      <ContentBlock className=" h-[500px] flex justify-center items-center ">
        <p>logged in as {session.user.email}</p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
