"use client"

import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ChatSection } from "@/components/ChatSection"
import { AboutSection } from "@/components/AboutSection"

export default function GalactIQ() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Navigation scrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />
        <div id="chat">
          <ChatSection />
        </div>
        <AboutSection />
      </main>
    </div>
  )
}
