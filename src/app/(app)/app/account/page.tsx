import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";

export default function Page() {
  return (
    <main className="">
      <H1 className=" text-white my-8 ">Your Acount</H1>
      <ContentBlock className=" h-[500px] flex justify-center items-center ">
        <p>logged in as ...</p>
      </ContentBlock>
    </main>
  );
}
