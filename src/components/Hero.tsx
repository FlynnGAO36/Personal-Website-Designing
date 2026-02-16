"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export function Hero() {
  const skills = ["Python", "C", "Java", "SQL", "JS", "TS", "Next.js"];

  return (
    <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* 背景光晕效果 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <motion.h1 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
              style={{ textShadow: "0 0 40px rgba(168, 85, 247, 0.5)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              你好，我是 Flynn 👋
            </motion.h1>
            <motion.p 
              className="mx-auto max-w-[700px] text-purple-200 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              就读于 <span className="font-semibold text-fuchsia-300">墨尔本大学 (Unimelb)</span>
              <br />
              预计于 2027 年 12 月毕业
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.5 + index * 0.1,
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <Badge 
                  variant="secondary" 
                  className="px-4 py-2 text-sm bg-purple-950/50 text-purple-200 border border-purple-500/50 hover:bg-purple-900/50 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 backdrop-blur-sm"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
