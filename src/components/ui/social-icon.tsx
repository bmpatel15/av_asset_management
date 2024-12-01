import { LucideIcon } from 'lucide-react'

interface SocialIconProps {
  icon: LucideIcon
}

export function SocialIcon({ icon: Icon }: SocialIconProps) {
  return (
    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
      <Icon className="w-5 h-5 text-white" />
    </button>
  )
} 