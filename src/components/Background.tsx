"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

const scaleVariant = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 150, delay: 0.5 },
  },
};

const Background = () => {
  return (
    <div className="relative h-[450px] md:h-[500px] lg:h-[550px] w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/marr.jpg"
          alt="Event Background"
          fill
          className="object-cover object-center brightness-75"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/60 to-indigo-900/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <motion.div
          className="max-w-4xl space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight font-playfair"
            variants={childVariants}
          >
            Craft Your Dream Event <br className="hidden md:block" />
            <motion.span
              className="text-amber-400 inline-block"
              variants={scaleVariant}
            >
              Effortlessly
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-gray-300 font-light max-w-3xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.7 } },
            }}
          >
            Discover curated venues, premium services, and seamless planning – your perfect event starts here.
          </motion.p>
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <div className="animate-bounce w-8 h-12 border-2 border-amber-400 rounded-2xl flex justify-center">
              <motion.div
                className="w-1 h-2 bg-amber-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Background;
