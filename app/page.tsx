import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PersonaSelector from "@/components/PersonaSelector"
import ChatInterface from "@/components/ChatInterface"
import TopicSelector from "@/components/TopicSelector"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">GalactIQ: Your Space Data Companion</h1>
        <p className="text-xl text-center mb-8">
          Access and understand space missions, celestial events, satellite data, and research papers with ease.
        </p>
        <PersonaSelector />
        <TopicSelector />
        <ChatInterface />
      </main>
      <Footer />
    </div>
  )
}

