import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Background from "@/components/Background";
import HeroMiddle from "@/components/HeroMiddle";
import Footer from "@/components/Footer";
import SignatureServices from "@/components/SignatureServices";
import Steps from "@/components/Steps";
import Link from "next/link";
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <Background />
      {!session && (
        <Link href={"/signup"}>
          <div className="flex w-full bg-gradient-to-b from-purple-100 to-pink-100 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-amber-500 mt-8 rounded-lg text-white text-lg cursor-pointer">
              Get Started
            </button>
          </div>
        </Link>
      )}
      <HeroMiddle />
      <SignatureServices />
      <Steps />
      <Footer />
    </main>
  );
}
