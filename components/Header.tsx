import { Rocket } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-slate-800 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Rocket className="w-8 h-8 text-blue-400" />
          <span className="text-2xl font-bold">GalactIQ</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

