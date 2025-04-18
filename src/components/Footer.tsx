"use client"
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.3 },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const Footer = () => {
  return (
    <motion.section
      className="relative py-24 px-4 text-white overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-900" />
      <div className="relative max-w-5xl mx-auto text-center">
        <motion.h2 className="text-4xl font-bold mb-6 font-playfair" variants={textVariants}>
          Begin Your Event Journey
        </motion.h2>
        <motion.p className="text-xl mb-12 max-w-2xl mx-auto text-purple-100" variants={textVariants}>
          Join our community of satisfied clients who transformed their dreams
          into spectacular realities
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row justify-center gap-6" variants={textVariants}>
          <motion.div variants={buttonVariants} whileHover="hover">
            <Button
              asChild
              size="lg"
              className="bg-amber-400 hover:bg-amber-500 text-purple-900 h-16 px-12 text-lg"
            >
              <Link href="/detail">Start Planning Now</Link>
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover">
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 hover:bg-white/10 h-16 px-12 text-lg"
            >
              <Link href="/detail">Browse Collections</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Footer;
