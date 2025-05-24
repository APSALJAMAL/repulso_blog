import React from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import heroImage from '../assets/aj1.jpg'
import heroImage1 from '../assets/aj2.jpg'
import heroImage2 from '../assets/aj3.jpg'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-44 pb-16 container mx-auto">
      {/* Left Column */}
      <div className="w-full md:w-1/2 space-y-8">
        <motion.div variants={fadeIn('right', 0.2)} initial="hidden" whileInView="show">
          {/* Star badge */}
          <div className="flex items-center gap-2 bg-gray-50 w-fit px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group">
            <span className="text-purple-600 group-hover:scale-110 transition-transform">🗿</span>
            <span className="text-sm font-medium">Uncovering Tamil Nadu's Heritage</span>
          </div>
        </motion.div>

        <motion.h1 
          variants={textVariant(0.3)}
          initial="hidden"
          whileInView="show"
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          Exploring the Ancient <br />
          <span className="text-purple-600 relative inline-block">
            Heritage of Tamil Nadu
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-200/60"></span>
          </span>
        </motion.h1>

        <motion.p 
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          className="text-gray-600 text-lg md:text-xl max-w-xl"
        >
          Chembavalam Research Base Trust is dedicated to investigating forgotten temples, ancient ruins, and historical landscapes —  
          bringing Tamil Nadu's timeless stories back to life through field exploration and scholarly documentation.
        </motion.p>

        <motion.div 
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          whileInView="show"
          className="flex gap-3 max-w-md"
        >
           
          {/* <input
            type="email"
            placeholder="Enter your email to receive updates"
            className="flex-1 px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all text-gray-600"
          /> */}
          <Link to="/">
  <button className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-100 active:scale-95 animate-bounce">
    Get Started
  </button>
</Link>
        </motion.div>
      </div>

      {/* Right Column - Images */}
      <motion.div 
        variants={fadeIn('left', 0.5)}
        initial="hidden"
        whileInView="show"
        className="w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12"
      >
        <div class="flex justify-center items-center gap-4 bg-white p-8">
 
  <div class="w-40 h-80 overflow-hidden rounded-[2rem]">
    <img
      src={heroImage}
      alt="Panel 1"
      class="object-cover h-full transform -translate-x-0"
    />
  </div>


  <div class="w-40 h-96 overflow-hidden rounded-[2rem]">
    <img
      src={heroImage1}
      alt="Panel 2"
      class="object-cover h-full transform -translate-x-0"
    />
  </div>

 
  <div class="w-40 h-80 overflow-hidden rounded-[2rem]">
    <img
      src={heroImage2}
      alt="Panel 3"
      class="object-cover h-full transform -translate-x-0"
    />
  </div>
</div>

      </motion.div>
    </section>
  )
}

export default Hero
