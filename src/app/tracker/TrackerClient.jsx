'use client'

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { format } from "date-fns";
import { FaArrowUpLong } from "react-icons/fa6";
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";


export default function TrackerClient({ user }) {
  const [prompt, setPrompt] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [totals, setTotals] = useState({
    calories: 0,
    fat: { total: 0, saturated: 0, trans: 0 },
    cholesterol: 0,
    sodium: 0,
    carbohydrates: { total: 0, fiber: 0, sugars: 0 },
    protein: 0,
  });

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function formatDate() {
      const now = new Date();
      return new Intl.DateTimeFormat("en-GB", {
        weekday: "long",   // Tuesday
        day: "numeric",    // 19
        month: "long",     // August
        year: "numeric",   // 2025
      }).format(now);
    }

    setDateTime(formatDate()); // initial set

    const timer = setInterval(() => {
      setDateTime(formatDate()); // update every minute
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodQuery: prompt }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      setResults(data);
      calculateTotals(data);
    } catch (err) {
      console.error(err);
      setError("Sorry, I couldn't retrieve the nutritional information.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut({ callbackUrl: "/" }); 
      // callbackUrl = where user goes after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const calculateTotals = (data) => {
    const newTotals = data.reduce(
      (acc, item) => ({
        calories: acc.calories + (item.calories || 0),
        fat: {
          total: acc.fat.total + (item.fat?.total || 0),
          saturated: acc.fat.saturated + (item.fat?.saturated || 0),
          trans: acc.fat.trans + (item.fat?.trans || 0),
        },
        cholesterol: acc.cholesterol + (item.cholesterol || 0),
        sodium: acc.sodium + (item.sodium || 0),
        carbohydrates: {
          total: acc.carbohydrates.total + (item.carbohydrates?.total || 0),
          fiber: acc.carbohydrates.fiber + (item.carbohydrates?.fiber || 0),
          sugars: acc.carbohydrates.sugars + (item.carbohydrates?.sugars || 0),
        },
        protein: acc.protein + (item.protein || 0),
      }),
      {
        calories: 0,
        fat: { total: 0, saturated: 0, trans: 0 },
        cholesterol: 0,
        sodium: 0,
        carbohydrates: { total: 0, fiber: 0, sugars: 0 },
        protein: 0,
      }
    );
    setTotals(newTotals);
  };

  const formattedDate = format(new Date("2025-08-19"), "EEEE do MMMM yyyy");

  return (
    <div className="">
      <div className="m-4 sm:m-8">
        {/* <div className="my-8 flex items-center justify-between  py-3 px-4 rounded-2xl">
          <div>
            <h1 className="font-bold font-sans text-lg">◗◗◗</h1>
          </div>
          <nav className="flex items-center justify-center gap-3 bg-[#242424] px-3 py-4 rounded-4xl">
            <ul>
              <Link href="/tracker" className={`px-4 py-2 rounded-4xl ${
                pathname === "/tracker"
                  ? "bg-[#444444] text-white"
                  : "hover:bg-[#333333]"
              }`}>Meal tracker</Link>
            </ul>
            <ul>
              <Link href="/calculator" className={`px-4 py-2 rounded-4xl ${
                pathname === "/calculator"
                  ? "bg-[#a0a0a0] text-black"
                  : "hover:bg-[#333333]"
              }`}>Calorie calculator</Link>
            </ul>
          </nav>
          <div>
            <form onSubmit={handleLogout}>
              <button type="submit" className="bg-[#242424] border px-4 py-2 text-black rounded-full hover:bg-[#343434] cursor-pointer">
                <h2 className="text-white">Logout</h2>
              </button>
            </form>
          </div>
        </div> */}
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
                  ? "bg-[#a0a0a0] text-black"
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
        
        <div className="text-start mx-[8vw]">
          <div className="mt-2 mb-8">
            <p className="text-2xl">Welcome <span className="bg-gradient-to-r from-[#7872ED] to-[#F59FF5] bg-clip-text text-transparent">
                {user?.name}
              </span>
              , start tracking your meals</p>
            <p className="text-[#a0a0a0] mt-2 text-lg">{dateTime}</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="form-container flex flex-row items-start sm:items-center justify-center gap-2 sm:gap-4 w-full mx-auto">
              {/* Input */}
              <textarea
                className="food-input bg-[#242424] rounded-4xl flex-1 min-w-[150px] w-full py-4 px-8 focus:outline-none focus:ring-0 text-md sm:text-lg resize-none overflow-hidden"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);

                  // auto-resize
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                rows={1}
                placeholder="e.g. 2 eggs, toast, apple"
                disabled={loading}
              />

              {/* Button */}
              <button
                className="bg-white text-black px-4 py-4 text-lg rounded-full cursor-pointer flex items-center justify-center shrink-0 sm:w-auto"
                type="submit"
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <FaArrowUpLong />
                )}
              </button>
            </div>
          </form>


          {error && <p className="error-message">{error}</p>}

          {results.length > 0 && (
            <>
              <div className="totals-card col-span-full mt-8 sm:mt-16">
                <h2 className="text-lg sm:text-2xl font-semibold">Meal Summary</h2>
                <div className="flex items-center justify-center mt-2 sm:mt-4">
                  <div className="w-full">
                    <p className="text-md sm:text-xl mt-4 w-full">
                      <span className="flex flex-wrap justify-between gap-4 sm:gap-8">
                        <span>🥦 Calories: {Math.round(totals.calories)} kcal</span>
                        <span>🧈 Fat: {totals.fat.total.toFixed(1)}g</span>
                        <span>🥩 Protein: {totals.protein.toFixed(1)}g</span>
                        <span>🍞 Carbs: {totals.carbohydrates.total.toFixed(1)}g</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-0 sm: mt-8 sm:mt-16">
                {results.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="result-card py-4 px-6 sm:px-8 bg-[#242424] rounded-4xl text-start"
                  >
                    <h3 className="text-xl sm:text-2xl font- pb-1">
                      {item.foodName}
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 sm:gap-x-20 gap-y-2 pt-2 text-[#b4b4b4] text-md sm:text-lg">
                      <span>Calories: {Math.round(item.calories)} kcal</span> 
                      <span>Protein: {item.protein.toFixed(1)}g</span> 
                      <span>Carbs: {item.carbohydrates.total.toFixed(1)}g</span> 
                      <span>Fat: {item.fat.total.toFixed(1)}g</span> 
                    </div>
                  </div>
                ))}
              </div>

            </>
          )}

        </div>

        
      </div>
    </div>
  );
}
