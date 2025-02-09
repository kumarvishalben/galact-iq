"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RocketIcon, BookIcon, GraduationCapIcon, SendIcon, HomeIcon, MessageCircleIcon, InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import ReactMarkdown from "react-markdown"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const Navigation = ({ scrollToSection }) => (
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
          <Button variant="ghost" size="sm" className="text-slate-200" onClick={() => scrollToSection("intro")}>
            <HomeIcon className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-200" onClick={() => scrollToSection("chat")}>
            <MessageCircleIcon className="w-4 h-4 mr-2" />
            Chat
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-200" onClick={() => scrollToSection("about")}>
            <InfoIcon className="w-4 h-4 mr-2" />
            About
          </Button>
        </div>
      </div>
    </div>
  </nav>
)

const HeroSection = () => (
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

const RoleCard = ({ role, selectedRole, setSelectedRole }) => (
  <Card
    key={role.title}
    className={`transition-all duration-200 cursor-pointer hover:bg-slate-800 ${selectedRole === role.title ? "bg-slate-800 border-indigo-500" : "bg-slate-900/50 border-slate-800"}`}
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
)

const RoleSelection = ({ selectedRole, setSelectedRole }) => {
  const roles = [
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
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white mb-6">Choose Your Role</h2>
      <motion.div className="space-y-4">
        {roles.map(role => (
          <RoleCard key={role.title} role={role} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
        ))}
      </motion.div>
    </div>
  )
}

const ChatSection = ({ messages, handleSubmit, input, setInput }) => (
  <Card className="bg-slate-900/50 border-slate-800">
    <CardContent className="p-6">
      <div className="space-y-6">
        <div className="h-[500px] overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
          {messages.length === 0 ? (
            <div className="flex text-white items-center justify-center h-full text-slate-400">
              <p>Start a conversation by selecting a role and asking a question</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={` text-white p-4 rounded-xl ${message.type === "user"
                  ? "bg-indigo-500/30 border border-indigo-400/30 ml-auto max-w-[80%]"
                  : "bg-slate-700/50 border border-slate-600/30 max-w-[80%]"
                  }`}
              >
                {message.type === "user" ? (
                  message.content
                ) : (
                  <ReactMarkdown
                    className="prose prose-invert max-w-none prose-headings:text-indigo-400 prose-a:text-indigo-400 hover:prose-a:text-indigo-300"
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about space missions, celestial events, satellite data, or research papers..."
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
          <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600">
            <SendIcon className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </CardContent>
  </Card>
)

const AboutSection = () => (
  <div className="mt-16">
    <div id="about" className="mb-12 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
      <h2 className="text-2xl font-bold mb-4 text-indigo-400">About The Project</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-slate-200">Technical Overview</h3>
          <p className="text-slate-300">
            Built with Python (&gt;=3.10 &lt;3.13) and powered by the crewAI framework, GalactIQ Crew utilizes UV for dependency management, ensuring a seamless setup and execution experience. Our system orchestrates multiple AI agents, each with unique roles and capabilities, to collaborate on complex space-related tasks.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-slate-200">Key Features</h3>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Multi-agent AI system for complex space data analysis</li>
            <li>Customizable agent configurations and task definitions</li>
            <li>Advanced collaboration between AI agents</li>
            <li>Comprehensive documentation and support resources</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-slate-200">Get Support</h3>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://docs.crewai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Documentation
            </a>
            <a
              href="https://github.com/joaomdmoura/crewai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300"
            >
              GitHub Repository
            </a>
            <a
              href="https://discord.com/invite/X4JWnZnxPb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function GalactIQ() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<Array<{ type: string; content: string }>>([])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { type: "user", content: input }])

      try {
        const response = await fetch(`${API_URL}/run-crew`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            space_query: input,
            role: selectedRole || "researcher",
            category: "space mission",
            topic: "Space",
            research_response: ""
          }),
        })

        const data = await response.json()

        if (data.status === "success") {
          let relevantResponse = ""

          if (data.result.tasks_output) {
            const agentMap: Record<string, string[]> = {
              researcher: ["Research Papers Agent", "Space Mission Agent"],
              educator: ["Space Mission Agent", "Satellite Data Agent"],
              student: ["Celestial Events Agent", "Space Mission Agent"]
            }

            const relevantAgents = agentMap[selectedRole || "researcher"] || []

            for (const agent of relevantAgents) {
              const agentResponse = data.result.tasks_output.find(
                (task: any) => task.agent?.trim() === agent && task.raw && !task.raw.includes("We apologize")
              )
              if (agentResponse?.raw) {
                relevantResponse = agentResponse.raw.replace(/```/g, '').trim()
                break
              }
            }

            if (!relevantResponse) {
              const firstValidResponse = data.result.tasks_output.find(
                (task: any) => task.raw && !task.raw.includes("We apologize") && !task.raw.includes("successfully posted to the Slack")
              )
              relevantResponse = firstValidResponse?.raw.replace(/```/g, '').trim() || ""
            }
          }

          if (!relevantResponse && data.result.raw) {
            relevantResponse = data.result.raw.replace(/```/g, '').trim()
          }

          if (!relevantResponse || relevantResponse.includes("successfully posted to the Slack")) {
            relevantResponse = "I apologize, but I don't have enough information to answer your question at the moment. Please try asking a more specific question about space missions, celestial events, or research papers."
          }

          setMessages(prev => [...prev, { type: "assistant", content: relevantResponse }])
        } else {
          setMessages(prev => [...prev, {
            type: "assistant",
            content: "I apologize, but I couldn't process your request at the moment. Please try again later."
          }])
        }
      } catch (error) {
        console.error('Error:', error)
        setMessages(prev => [...prev, {
          type: "assistant",
          content: "I apologize, but there was an error processing your request. Please try again later."
        }])
      }

      setInput("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Navigation scrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />
        <div id="chat" className="grid lg:grid-cols-[400px,1fr] gap-8">
          <RoleSelection selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
          <ChatSection messages={messages} handleSubmit={handleSubmit} input={input} setInput={setInput} />
        </div>
        <AboutSection />
      </main>
    </div>
  )
}
