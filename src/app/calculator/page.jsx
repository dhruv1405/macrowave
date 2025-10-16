'use client'

import React from 'react'
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { format } from "date-fns";
import { FaArrowUpLong } from "react-icons/fa6";
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";

const page = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const [age, setAge] = useState(0);
    const [height, setHeight] = useState({value: 0, unit: "cms"});
    const [weight, setWeight] = useState({value: 0, unit: "kgs"});
    const [calculatedMacros, setCalculatedMacros] = useState(0.0);

    

    const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut({ callbackUrl: "/" }); 
      // callbackUrl = where user goes after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (weight.unit === "lbs") { 
                setWeight({value:weight.value/2.2, unit:"kg"})
             }
            
             if (height.unit === "inch") { 
                setWeight({value:weight.value/2.54, unit:"cms"})
             }
            setCalculatedMacros((10*weight.value)+(6.5*height.value)-(5*age));
        } catch (error) {
            
        }
    }

  return (
    <div>
        <div className='m-4 sm:m-8'>
            <div className="my-8 flex items-center justify-between py-3 px-4 rounded-2xl relative z-50">
                {/* Logo (always visible) */}
                <div>
                    <h1 className="font-bold font-sans text-lg">◗◗◗</h1>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2 bg-[#242424] px-2 py-2 rounded-4xl">
                    <Link
                    href="/tracker"
                    className={`px-4 py-2 rounded-4xl ${
                        pathname === "/tracker"
                        ? "bg-[#444444] text-white"
                        : "hover:bg-[#333333]"
                    }`}
                    >
                    Meal tracker
                    </Link>

                    <Link
                    href="/calculator"
                    className={`px-4 py-2 rounded-4xl ${
                        pathname === "/calculator"
                        ? "bg-[#444444] text-white"
                        : "hover:bg-[#333333]"
                    }`}
                    >
                    Macros calculator
                    </Link>
                </div>

                {/* Desktop Logout */}
                <div className="hidden md:block">
                    <form onSubmit={handleLogout}>
                    <button
                        type="submit"
                        className="bg-[#242424] border px-4 py-2 text-black rounded-full hover:bg-[#343434] cursor-pointer"
                    >
                        <h2 className="text-white">Logout</h2>
                    </button>
                    </form>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? (
                        <IoClose size={32} className="text-white" />
                    ) : (
                        <IoMenu size={32} className="text-white" />
                    )}
                    </button>
                </div>

                {/* Full-Screen Overlay Menu */}
                {menuOpen && (
                    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center gap-12 text-xl z-40">
                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6"
                        onClick={() => setMenuOpen(false)}
                    >
                        <IoClose size={40} className="text-white" />
                    </button>

                    {/* Nav Links */}
                    <Link
                        href="/tracker"
                        onClick={() => setMenuOpen(false)}
                        className={`px-6 py-3 rounded-4xl text-white underline`}
                    >
                        Meal tracker
                    </Link>

                    <Link
                        href="/calculator"
                        onClick={() => setMenuOpen(false)}
                        className={`px-6 py-3 rounded-xl text-white underline`}
                    >
                        Macros calculator
                    </Link>

                    {/* Logout */}
                    <form onSubmit={handleLogout}>
                        <button
                        type="submit"
                        className="w-full bg-[#242424] cursor-pointer text-white px-4 py-2 rounded-4xl hover:bg-[#343434]"
                        >
                        Logout
                        </button>
                    </form>
                    </div>
                )}
                </div>

                <div className='text-center mt-[4vw]'>
                    <h1 className='text-xl sm:text-3xl'>Macro requirement calculator</h1>
                </div>
                
                <div className='flex items-center justify-center'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className='my-8 flex flex-col'>
                                <label className='pl-4 mb-2' htmlFor="age">Age</label>
                                <div className="flex items-center gap-2">

                                </div>
                                <input id='age' type="number" className='bg-[#242424] px-4 py-2 rounded-4xl focus:outline-none focus:ring-0' value={age} onChange={(e) => setAge(e.target.value)} placeholder='years'/>
                            </div>
                            <div className='my-8 flex flex-col'>
                                <label className='pl-4 mb-2' htmlFor="height">Height</label>
                                <div className="flex items-center gap-2">
                                    <input id='height' type="number" className='bg-[#242424] px-4 py-2 rounded-4xl focus:outline-none focus:ring-0' value={height.value} onChange={(e) =>
                                    setHeight({
                                        ...height,
                                        value: parseInt(e.target.value) || "", // update only the number
                                    })} placeholder='centimeters'/>

                                    <select
                                        className=" px-2 py-2 text-center rounded-4xl focus:outline-none focus:ring-0"
                                        value={height.unit}
                                        onChange={(e) =>
                                        setHeight({
                                            ...height,
                                            unit: e.target.value, // update only the unit
                                        })
                                        }>
                                        <option className='bg-[#242424]' value="cms">cms</option>
                                        <option className='bg-[#242424]' value="inch">inch</option>
                                    </select>
                                </div>
                                
                            </div>
                            <div className='my-8 flex flex-col'>
                                <label className='pl-4 mb-2' htmlFor='weight'>Weight</label>
                                <div className="flex items-center gap-2">
                                    <input id='weight' type="number" className='bg-[#242424] px-4 py-2 rounded-4xl focus:outline-none focus:ring-0' value={weight.value} onChange={(e) =>
                                    setWeight({
                                        ...weight,
                                        value: parseInt(e.target.value) || "", // update only the number
                                    })} placeholder='kilograms'/>

                                    <select
                                        className=" px-2 py-2 text-center rounded-4xl focus:outline-none focus:ring-0"
                                        value={weight.unit}
                                        onChange={(e) =>
                                        setWeight({
                                            ...weight,
                                            unit: e.target.value, // update only the unit
                                        })
                                        }
                                    >
                                        <option className='bg-[#242424]' value="kgs">kgs</option>
                                        <option className='bg-[#242424]' value="lbs">lbs</option>
                                    </select>
                                </div>
                                
                            </div>
                            <div className='flex items-center justify-center'>
                                <button className='bg-white cursor-pointer text-black px-4 py-2 rounded-4xl w-full hover:bg-gray-200' type='submit'>Calculate macros</button>
                            </div>
                            <div className='flex items-center justify-center mt-10'>
                                <h1 className='text-xl'>{calculatedMacros} calories </h1>
                            </div>
                        </div>
                    </form>
                    
                </div>

        </div>
    </div>
  )
}

export default page