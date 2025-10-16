'use client'

import React from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";

const SectionButton = () => {
  return (
    <div>
        <button onClick={() => document.getElementById("section2").scrollIntoView({ behavior: "smooth" })} className="bottom-6 text-white animate-bounce">
            <IoIosArrowDropdownCircle className="text-white text-4xl cursor-pointer"/>
          </button>
    </div>
  )
}

export default SectionButton