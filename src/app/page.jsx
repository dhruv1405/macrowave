
import { auth } from "../auth"
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from 'next/link'

import SectionButton  from "./components/SectionButton";


export default async function Home() {

  const session = await auth()
    console.log(session)
    const user = session?.user

  if (user) {
      redirect("/tracker");
    }

  return (
    <div className="m-8">
      <section id="hero" className="pb-24">
        <div className="my-8 flex items-center justify-between  py-3 px-4 rounded-2xl">
          <div>
            <h1 className="font-bold font-sans text-lg cursor-pointer">◗◗◗</h1>
          </div>
          <div>
              <button className="bg-white border px-4 py-2 text-black rounded-full hover:bg-gray-200 cursor-pointer">
                <Link href="/login"><h2>Begin your journey</h2></Link>
              </button>
          </div>
        </div>

        <div>
          <div className="relative w-full flex justify-center items-center">
          {/* Image */}
            <img 
              src="/cabbage.png" 
              alt="cabbage"  
              className="max-h-[500px] rotate-25 opacity-65"
            />

            {/* Text overlay */}
            <h1 className="absolute bottom-6 text-4xl sm:text-6xl md:text-8xl font-semibold text-center px-4">
              Track your meals accurately with MacroWave
            </h1>
          </div>
        </div>
        <div className=" flex justify-center items-center mt-52">
          <SectionButton />
        </div>
      </section>
      
      <section id="section2" className="min-h-screen flex justify-center pt-40 bg-[#242424] rounded-4xl pb-40">
        <div className="">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">Why use MacroWave?</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 mx-[10vw] mt-28">
            <div className="text-center px-1 sm:px-8 mb-16">
              <div>
                <h1 className="text-8xl">⚡</h1>
              </div>
              <div className="mt-8">
                <h1 className="text-2xl font-semibold">Fast & Simple</h1>
                <p className="mt-4 text-md sm:text-lg">Skip the hassle of manual entries. Just type what you ate, and MacroWave instantly logs your meal with AI-powered precision.</p>
              </div>
            </div>

            <div className="text-center px-1 sm:px-8 mb-16">
              <div>
                <h1 className="text-8xl">📊</h1>
              </div>
              <div className="mt-8">
                <h1 className="text-2xl font-semibold">Detailed Breakdown</h1>
                <p className="mt-4 text-md sm:text-lg">Get more than just calories — see proteins, carbs, fats, and nutrients broken down in seconds, giving you a complete picture of your meals.</p>
              </div>
            </div>

            <div className="text-center px-1 sm:px-8">
              <div>
                <h1 className="text-8xl">🎯</h1>
              </div>
              <div className="mt-8">
                <h1 className="text-2xl font-semibold">Built for You</h1>
                <p className="mt-4 text-md sm:text-lg">Designed with simplicity in mind, MacroWave adapts to your lifestyle so you can stay consistent and focused on your health goals.</p>
              </div>
            </div>
            
          </div>

        </div>
      </section>

      <section className="mt-16 border-t-1 border-[#525252]">
        <footer className="mt-8 flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-evenly w-full text-center text-[#a0a0a0]">
            <div>
              <ul>Report a bug</ul>
            </div>
            <div>
              <ul>About</ul>
            </div>
            <div>
              <ul>Contact</ul>
            </div>
          </div>
        </footer>
      </section>
      

    </div>
  );
}
