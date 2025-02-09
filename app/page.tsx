"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RocketIcon, BookIcon, GraduationCapIcon, SendIcon, HomeIcon, MessageCircleIcon, InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function GalactIQ() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <RocketIcon className="w-8 h-8 text-indigo-400" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                GalactIQ
              </span>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-200">
                <HomeIcon className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-200">
                <MessageCircleIcon className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-200">
                <InfoIcon className="w-4 h-4 mr-2" />
                About
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-white mb-4">GalactIQ: Your Space Data Companion</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Welcome to GalactIQ Crew, a powerful multi-agent AI system powered by crewAI. Our platform enables
              intelligent agents to collaborate effectively on complex space-related tasks, maximizing collective
              intelligence and capabilities.
            </p>
          </motion.div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[400px,1fr] gap-8">
          {/* Roles Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-6">Choose Your Role</h2>
            <motion.div className="space-y-4">
              {[
                {
                  title: "Researcher",
                  icon: BookIcon,
                  description: "Access detailed information on planetary studies and space research.",
                },
                {
                  title: "Educator",
                  icon: GraduationCapIcon,
                  description: "Get simplified explanations and educational resources for students.",
                },
                {
                  title: "Student",
                  icon: RocketIcon,
                  description: "Learn about space missions, celestial events, and satellite data.",
                },
              ].map((role) => (
                <Card
                  key={role.title}
                  className={`transition-all duration-200 cursor-pointer hover:bg-slate-800 ${selectedRole === role.title ? "bg-slate-800 border-indigo-500" : "bg-slate-900/50 border-slate-800"
                    }`}
                  onClick={() => setSelectedRole(role.title)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-indigo-500/10">
                        <role.icon className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{role.title}</h3>
                        <p className="text-slate-300 text-sm">{role.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Chat Section */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item * 0.1 }}
                      className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                    >
                      <h4 className="text-white font-semibold mb-2">Research Paper {item}</h4>
                      <p className="text-slate-300 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore.
                      </p>
                      <Button variant="link" size="sm" className="text-indigo-400 mt-2 p-0">
                        Read more
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about space missions, celestial events, satellite data, or research papers..."
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  <Button className="bg-indigo-500 hover:bg-indigo-600">
                    <SendIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

