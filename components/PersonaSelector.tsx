"use client"

import { useState } from "react"
import { GraduationCap, Microscope, Glasses } from "lucide-react"

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

export default function PersonaSelector() {
  const [selectedPersona, setSelectedPersona] = useState(null)

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Role</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {personas.map((persona) => (
          <button
            key={persona.id}
            className={`p-4 rounded-lg border-2 transition-all ${selectedPersona === persona.id
              ? "bg-nasa-blue border-blue-400"
              : "bg-slate-800 border-slate-700 hover:border-blue-400"
              }`}
            onClick={() => setSelectedPersona(persona.id)}
          >
            <persona.icon className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-2">{persona.name}</h3>
            <p className="text-sm text-slate-300">{persona.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

