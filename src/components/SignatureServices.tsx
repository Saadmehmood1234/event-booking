"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./Button";
import Link from "next/link";
import { HomeServices } from "../lib/data/HomeService";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

const imageHoverVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const SignatureServices = () => {
  return (
    <motion.section
      className="py-16 px-4 bg-gradient-to-b from-purple-100 to-pink-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 font-playfair"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Signature Experiences
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Immerse yourself in our visually stunning event solutions
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {HomeServices.map((service) => (
            <motion.div
              key={service.id}
              className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20 cursor-pointer"
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <motion.div
                className="relative h-full w-full"
                variants={imageHoverVariants}
                whileHover="hover"
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  quality={100}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-4">
                  <h3 className="text-3xl font-bold font-playfair drop-shadow-xl">
                    {service.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-amber-500/90 px-4 py-1 rounded-full">
                      ₹{service.price.toLocaleString()}
                      <span className="text-sm ml-1">/day</span>
                    </span>
                    <Button
                      asChild
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30"
                    >
                      <Link href={`/detail`}>
                        <span className="flex items-center gap-2">
                          Explore
                          <span className="text-lg">→</span>
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SignatureServices;
