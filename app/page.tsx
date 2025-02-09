"use client"

import { useState } from "react"
import { Send, GraduationCap, Microscope, Glasses } from "lucide-react"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ReactMarkdown from "react-markdown"



function HeaderIntro() {
  return (
    <div id="intro" className="flex flex-row items-center mb-8">
      <img
        src="/logo.png"
        alt="GalactIQ Logo - A representation of space data"
        className="w-32 h-32 mr-6 rounded-xl"
        aria-label="GalactIQ Logo"
      />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          GalactIQ: Your Space Data Companion
        </h1>
        <p className="text-md mb-4 text-slate-300">
          Welcome to GalactIQ Crew, a powerful multi-agent AI system powered by crewAI. Our platform enables intelligent agents to collaborate effectively on complex space-related tasks, maximizing collective intelligence and capabilities.
        </p>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <div id="about" className="mb-12 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">About The Project</h2>
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
            <a href="https://docs.crewai.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Documentation</a>
            <a href="https://github.com/joaomdmoura/crewai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">GitHub Repository</a>
            <a href="https://discord.com/invite/X4JWnZnxPb" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Join Discord</a>
          </div>
        </div>
      </div>
    </div>
  )
}

const personas = [
  {
    id: "researcher",
    name: "Researcher",
    icon: Microscope,
    description: "Access detailed information on planetary studies and space research.",
  },
  {
    id: "educator",
    name: "Educator",
    icon: Glasses,
    description: "Get simplified explanations and educational resources for students.",
  },
  {
    id: "student",
    name: "Student",
    icon: GraduationCap,
    description: "Learn about space missions, celestial events, and satellite data.",
  }
]

function ChatSection() {
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<Array<{ type: string; content: string }>>([])
  const [selectedPersona, setSelectedPersona] = useState<string | null>("researcher")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { type: "user", content: input }])

      try {
        const response = await fetch('http://localhost:8000/run-crew', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            space_query: input,
            role: selectedPersona,
            category: "space mission",
            topic: "Space",
            research_response: ""
          }),
        })

        const data = await response.json()

        if (data.status === "success") {
          // Find the most relevant response based on the selected persona
          let relevantResponse = ""

          if (data.result.tasks_output) {
            // Find response from the agent matching the selected persona
            const agentMap = {
              researcher: ["Research Papers Agent", "Space Mission Agent"],
              educator: ["Space Mission Agent", "Satellite Data Agent"],
              student: ["Celestial Events Agent", "Space Mission Agent"]
            }

            const relevantAgents = agentMap[selectedPersona as keyof typeof agentMap] || []

            // Find the first non-empty response from relevant agents
            for (const agent of relevantAgents) {
              const agentResponse = data.result.tasks_output.find(
                task => task.agent?.trim() === agent && task.raw && !task.raw.includes("We apologize")
              )
              if (agentResponse?.raw) {
                relevantResponse = agentResponse.raw.replace(/```/g, '').trim()
                break
              }
            }

            // If no relevant agent response found, use the first non-empty response
            if (!relevantResponse) {
              const firstValidResponse = data.result.tasks_output.find(
                task => task.raw && !task.raw.includes("We apologize") && !task.raw.includes("successfully posted to the Slack")
              )
              relevantResponse = firstValidResponse?.raw.replace(/```/g, '').trim() || ""
            }
          }

          // If no relevant response found in tasks_output, use the raw response
          if (!relevantResponse && data.result.raw) {
            relevantResponse = data.result.raw.replace(/```/g, '').trim()
          }

          // If still no relevant response, show an apologetic message
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
    <div id="chat" className="flex flex-col md:flex-row gap-8">
      {/* Left Column - Persona Selection */}
      <div className="md:w-1/3">
        <div className="sticky top-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Role</h2>
          <div className="flex flex-col gap-4">
            {personas.map((persona) => (
              <button
                key={persona.id}
                className={`p-6 rounded-xl border-2 transition-all hover:transform hover:scale-102 ${selectedPersona === persona.id
                  ? "bg-nasa-blue/20 border-blue-400 shadow-lg shadow-blue-500/20"
                  : "bg-slate-800/50 border-slate-700 hover:border-blue-400/50"
                  }`}
                onClick={() => setSelectedPersona(persona.id)}
              >
                <div className="flex items-center gap-4">
                  <persona.icon className="w-8 h-8 text-blue-400" />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold mb-1">{persona.name}</h3>
                    <p className="text-sm text-slate-300">{persona.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Chat Interface */}
      <div className="md:w-2/3">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border-2 border-slate-700">
          <div className="h-[500px] overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-400">
                <p>Start a conversation by selecting a role and asking a question</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${message.type === "user"
                    ? "bg-nasa-blue/30 border border-blue-400/30 ml-auto max-w-[80%]"
                    : "bg-slate-700/50 border border-slate-600/30 max-w-[80%]"
                    }`}
                >
                  {message.type === "user" ? (
                    message.content
                  ) : (
                    <ReactMarkdown
                      className="prose prose-invert max-w-none prose-headings:text-blue-400 prose-a:text-blue-400 hover:prose-a:text-blue-300"
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about space missions, celestial events, satellite data, or research papers..."
              className="flex-grow bg-slate-700/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-slate-600"
            />
            <button
              type="submit"
              className="bg-nasa-blue text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span className="hidden md:inline">Send</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="flex-grow space-y-8 container mx-auto px-4  py-8">
        <HeaderIntro />
        <ChatSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
