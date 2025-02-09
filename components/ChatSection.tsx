import { SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import ReactMarkdown from "react-markdown"

interface Message {
    type: string
    content: string
}

interface ChatSectionProps {
    messages: Message[]
    handleSubmit: (e: React.FormEvent) => void
    input: string
    setInput: (value: string) => void
}

export const ChatSection = ({ messages, handleSubmit, input, setInput }: ChatSectionProps) => (
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