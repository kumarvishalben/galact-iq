import { motion } from "framer-motion"
import { BookIcon, GraduationCapIcon, RocketIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Role {
    title: string
    icon: any
    description: string
}

interface RoleCardProps {
    role: Role
    selectedRole: string | null
    setSelectedRole: (role: string) => void
}

const RoleCard = ({ role, selectedRole, setSelectedRole }: RoleCardProps) => (
    <Card
        key={role.title}
        className={`transition-all duration-200 cursor-pointer hover:bg-slate-800 ${selectedRole === role.title ? "bg-slate-800 border-indigo-500" : "bg-slate-900/50 border-slate-800"
            }`}
        onClick={() => setSelectedRole(role.title)}
    >
        <CardContent className="p-6">
            <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                    <role.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{role.title}</h3>
                    <p className="text-slate-300 text-sm">{role.description}</p>
                </div>
            </div>
        </CardContent>
    </Card>
)

interface RoleSelectionProps {
    selectedRole: string | null
    setSelectedRole: (role: string) => void
}

export const RoleSelection = ({ selectedRole, setSelectedRole }: RoleSelectionProps) => {
    const roles: Role[] = [
        {
            title: "Researcher",
            icon: BookIcon,
            description: "Access detailed information on planetary studies and space research.",
        },
        {
            title: "Educator",
            icon: GraduationCapIcon,
            description: "Get simplified explanations and educational resources for students.",
        },
        {
            title: "Student",
            icon: RocketIcon,
            description: "Learn about space missions, celestial events, and satellite data.",
        },
    ]

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-6">Choose Your Role</h2>
            <motion.div className="space-y-4">
                {roles.map(role => (
                    <RoleCard key={role.title} role={role} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
                ))}
            </motion.div>
        </div>
    )
} 