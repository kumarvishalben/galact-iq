import { RocketIcon, HomeIcon, MessageCircleIcon, InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <RocketIcon className="w-8 h-8 text-indigo-400" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              GalactIQ
            </span>
          </div>
          <nav>
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
                Aboutsdsad
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

