import { HomeIcon, MessageCircleIcon, InfoIcon, RocketIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
    scrollToSection: (sectionId: string) => void
}

export const Navigation = ({ scrollToSection }: NavigationProps) => (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <RocketIcon className="w-8 h-8 text-indigo-400" />
                    <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                        GalactIQ
                    </span>
                </div>
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
                        About
                    </Button>
                </div>
            </div>
        </div>
    </nav>
)

