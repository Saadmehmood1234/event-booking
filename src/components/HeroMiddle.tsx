"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Star, IndianRupee, HeartHandshake } from "lucide-react";
import { Button } from "./ui/button";

const HeroMiddle = () => {
  return (
    <motion.section 
      className="py-16 px-4 bg-gradient-to-b from-purple-25 to-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 bg-[url('/assets/svg/diamond-pattern.svg')] opacity-10"
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-400/20 to-pink-300/20 rounded-full blur-3xl -top-32 -left-32"
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-amber-300/20 to-orange-400/20 rounded-full blur-2xl -bottom-32 -right-32"
          animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section */}
        <div className="text-center mb-20">
          <motion.div 
            className="inline-block relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold font-playfair text-purple-900 mb-4">
              Why{' '}
              <motion.span 
                className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Elevate Events?
              </motion.span>
            </h2>
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.p
            className="text-lg text-purple-700/90 max-w-2xl mx-auto mt-6 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover the unparalleled experience that sets us apart in creating your dream celebrations
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              title: "Curated Excellence",
              icon: <Star className="h-10 w-10" strokeWidth={1.5} />,
              text: "Handpicked venues meeting our premium standards",
              bg: "from-purple-600 to-indigo-600",
              color: "bg-purple-600"
            },
            {
              title: "Transparent Pricing",
              icon: <IndianRupee className="h-10 w-10" strokeWidth={1.5} />,
              text: "No hidden charges with price-match guarantee",
              bg: "from-amber-500 to-orange-500",
              color: "bg-amber-500"
            },
            {
              title: "Stress-Free Planning",
              icon: <HeartHandshake className="h-10 w-10" strokeWidth={1.5} />,
              text: "Dedicated coordinator from start to finish",
              bg: "from-emerald-500 to-cyan-600",
              color: "bg-emerald-500"
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group relative p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-purple-50 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.4 }}
              viewport={{ once: true }}
            >
              {/* Hover effect layer */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              
              {/* Icon container */}
              <motion.div
                className={`mb-8 inline-flex items-center justify-center rounded-2xl ${feature.color} p-4 shadow-lg relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="text-white relative z-10"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  {feature.icon}
                </motion.div>
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl lg:text-3xl font-semibold text-purple-900 mb-4 font-playfair">
                {feature.title}
              </h3>
              <p className="text-lg text-purple-700/90 leading-relaxed mb-6">
                {feature.text}
              </p>

              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/20"
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            className="relative overflow-hidden bg-gradient-to-br from-purple-800 to-indigo-900 h-14 px-8 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl"
          >
            <Link href={"/signin"}>
              <motion.span 
                className="relative z-10 flex items-center gap-2"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Promise
                <ArrowRight className="h-5 w-5" />
              </motion.span>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroMiddle;