import { motion } from "framer-motion"
import Image from "next/image"

export const HeroSection = () => (
    <div id="intro" className="flex gap-10 flex-col items-center justify-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
            <Image src="/logo.png" alt="GalactIQ" className="rounded-full" width={150} height={150} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-white mb-4">GalacticIQ - Unlocking the Universe, One Question at a Time</h1>
            <p className="text-lg text-center text-slate-300 max-w-3xl">
                Welcome to GalactIQ Crew, a powerful multi-agent AI system powered by crewAI. Our platform enables
                intelligent agents to collaborate effectively on complex space-related tasks, maximizing collective
                intelligence and capabilities.
            </p>
        </motion.div>
    </div>
) 