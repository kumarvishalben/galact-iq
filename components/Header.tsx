import { Rocket } from "lucide-react"

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-sm py-4 border-b border-slate-700">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Rocket className="w-8 h-8 text-blue-400" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            GalactIQ
          </span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => scrollToSection("intro")}
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("chat")}
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                Chat
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                About
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

