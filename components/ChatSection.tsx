"use client"

import { useState } from "react"
import { SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import ReactMarkdown from "react-markdown"
import { RoleSelection } from "@/components/RoleSelection"
import { Loader2 } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface Message {
    type: string
    content: string
}

export const ChatSection = () => {
    const [selectedRole, setSelectedRole] = useState<string | null>(null)
    const [input, setInput] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            setMessages([...messages, { type: "user", content: input }])
            setIsLoading(true)

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
            } finally {
                setIsLoading(false)
                setInput("")
            }
        }
    }

    return (
        <div className="grid lg:grid-cols-[400px,1fr] gap-8">
            <RoleSelection selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
            <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                    <div className="space-y-6">
                        <div className="h-[500px] overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
                            {messages.length === 0 ? (
                                <div className="flex text-white items-center justify-center h-full text-slate-400">
                                    <p>Start a conversation by selecting a role and asking a question</p>
                                </div>
                            ) : (
                                <>
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`text-white p-4 rounded-xl ${message.type === "user"
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
                                    ))}
                                    {isLoading && (
                                        <div className="flex items-center justify-center space-x-2 text-white">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Thinking...</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about space missions, celestial events, satellite data, or research papers..."
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                                disabled={isLoading}
                            />
                            <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600" disabled={isLoading}>
                                <SendIcon className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 