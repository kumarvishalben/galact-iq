"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { RoleSelection } from "@/components/RoleSelection"
import { ChatSection } from "@/components/ChatSection"
import { AboutSection } from "@/components/AboutSection"

const API_URL = process.env.NEXT_PUBLIC_API_URL

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
