"use client"

import { useState } from "react"

const topics = ["Space Missions", "Celestial Events", "Satellite Data", "Research Papers"]

export default function TopicSelector() {
  const [selectedTopic, setSelectedTopic] = useState(null)

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Select a Topic</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedTopic === topic ? "bg-nasa-blue text-white" : "bg-slate-800 hover:bg-slate-700"
            }`}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  )
}

