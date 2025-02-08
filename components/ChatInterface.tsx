"use client"

import { useState } from "react"
import { Send } from "lucide-react"

const complexityLevels = ["Basic", "Intermediate", "Advanced"]

export default function ChatInterface() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [complexity, setComplexity] = useState("Intermediate")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { type: "user", content: input }])
      // Here you would typically send the input to your backend
      // along with the selected complexity level
      // and then add the response to the messages
      setInput("")
    }
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="mb-4">
        <label htmlFor="complexity" className="block text-sm font-medium mb-2">
          Complexity Level:
        </label>
        <select
          id="complexity"
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
          className="bg-slate-700 text-white rounded-lg px-3 py-2 w-full"
        >
          {complexityLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${message.type === "user" ? "bg-nasa-blue ml-auto" : "bg-slate-700"} max-w-3/4`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about space missions, celestial events, satellite data, or research papers..."
          className="flex-grow bg-slate-700 text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-nasa-blue text-white rounded-r-lg px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}

