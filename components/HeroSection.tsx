import { motion } from "framer-motion"

export const HeroSection = () => (
    <div id="intro" className="text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-white mb-4">GalactIQ: Your Space Data Companion</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Welcome to GalactIQ Crew, a powerful multi-agent AI system powered by crewAI. Our platform enables
                intelligent agents to collaborate effectively on complex space-related tasks, maximizing collective
                intelligence and capabilities.
            </p>
        </motion.div>
    </div>
) 