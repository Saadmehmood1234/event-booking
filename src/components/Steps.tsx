"use client";
import { motion } from "framer-motion";
import { Search, CheckCircle, CalendarCheck, PartyPopper } from "lucide-react";

const stepVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.2,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    },
  }),
};

const Steps = () => {
  return (
    <motion.section
      className="py-24 px-4 bg-gradient-to-b from-violet-50 to-rose-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() * 100 + 150}, ${Math.random() * 50}, ${Math.random() * 150 + 100}, 0.1)`
            }}
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 font-playfair bg-gradient-to-r from-violet-700 to-rose-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Effortless Event Planning
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Progress line */}
          <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-violet-100 to-rose-100 rounded-full" />
          
          {[
            {
              icon: <Search className="h-8 w-8 text-white" />,
              title: "Discover & Design",
              description: "Explore our curated collections and craft your perfect event vision",
              gradient: "linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)",
              accent: "#DB2777"
            },
            {
              icon: <CheckCircle className="h-8 w-8 text-white" />,
              title: "Secure & Confirm",
              description: "Instant booking confirmation with flexible payment options",
              gradient: "linear-gradient(135deg, #0E7490 0%, #0D9488 100%)",
              accent: "#0D9488"
            },
            {
              icon: <PartyPopper className="h-8 w-8 text-white" />,
              title: "Celebrate & Enjoy",
              description: "Relax while we handle every detail of your special day",
              gradient: "linear-gradient(135deg, #EA580C 0%, #F59E0B 100%)",
              accent: "#EA580C"
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="relative pt-20 group"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ y: -10 }}
            >
              {/* Animated number badge */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl backdrop-blur-sm"
                style={{ background: step.gradient }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <div className="relative z-10">
                  {step.icon}
                  <span 
                    className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full flex items-center justify-center text-sm shadow-sm"
                    style={{ color: step.accent }}
                  >
                    {index + 1}
                  </span>
                </div>
              </motion.div>

              {/* Content card */}
              <div className="pt-16 px-6 pb-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-opacity-10" 
                   style={{ borderColor: step.accent }}>
                <h3 
                  className="text-2xl font-semibold mb-4 font-playfair"
                  style={{ color: step.accent }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {step.description}
                </p>
                
                {/* Animated hover element */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-opacity-20"
                  style={{ borderColor: step.accent }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>

              {/* Connector dots */}
              {index < 2 && (
                <div 
                  className="hidden md:block absolute top-24 -right-14 w-14 h-1 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${step.accent} 0%, ${step.accent}00 100%)` }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Steps;