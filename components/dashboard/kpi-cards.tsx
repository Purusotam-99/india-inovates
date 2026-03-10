"use client"

import { cn } from "@/lib/utils"
import { Server, Gauge, Ambulance, Brain } from "lucide-react"

interface KPICardProps {
  icon: React.ElementType
  title: string
  value: string
  subtitle: string
  status: "healthy" | "warning" | "critical" | "info"
  glow?: boolean
}

function KPICard({ icon: Icon, title, value, subtitle, status, glow }: KPICardProps) {
  const statusColors = {
    healthy: "text-neon-emerald border-neon-emerald/30 bg-neon-emerald/5",
    warning: "text-neon-amber border-neon-amber/30 bg-neon-amber/5",
    critical: "text-neon-rose border-neon-rose/30 bg-neon-rose/5",
    info: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5",
  }

  const iconColors = {
    healthy: "text-neon-emerald bg-neon-emerald/20",
    warning: "text-neon-amber bg-neon-amber/20",
    critical: "text-neon-rose bg-neon-rose/20",
    info: "text-neon-cyan bg-neon-cyan/20",
  }

  const glowColors = {
    healthy: "shadow-[0_0_30px_rgba(52,211,153,0.15)]",
    warning: "shadow-[0_0_30px_rgba(251,191,36,0.15)]",
    critical: "shadow-[0_0_30px_rgba(251,113,133,0.15)]",
    info: "shadow-[0_0_30px_rgba(34,211,238,0.15)]",
  }

  return (
    <div
      className={cn(
        "relative p-4 lg:p-5 rounded-xl border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]",
        statusColors[status],
        glow && glowColors[status]
      )}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-xl lg:text-2xl font-bold text-foreground mb-1">
            {value}
          </p>
          <p className={cn("text-sm font-medium", statusColors[status].split(" ")[0])}>
            {subtitle}
          </p>
        </div>
        <div className={cn("p-3 rounded-xl", iconColors[status])}>
          <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
        </div>
      </div>

      {/* Status Indicator */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
        <div className={cn(
          "w-1.5 h-1.5 rounded-full animate-pulse",
          status === "healthy" && "bg-neon-emerald",
          status === "warning" && "bg-neon-amber",
          status === "critical" && "bg-neon-rose",
          status === "info" && "bg-neon-cyan"
        )} />
      </div>
    </div>
  )
}

export function KPICards() {
  const kpis: KPICardProps[] = [
    {
      icon: Server,
      title: "Active Edge Nodes",
      value: "142 / 145",
      subtitle: "Online",
      status: "healthy",
      glow: true,
    },
    {
      icon: Gauge,
      title: "Current Grid Congestion",
      value: "18%",
      subtitle: "Smooth Traffic",
      status: "healthy",
      glow: true,
    },
    {
      icon: Ambulance,
      title: "Active Emergency Vehicles",
      value: "2",
      subtitle: "Active V2X Corridors",
      status: "info",
      glow: true,
    },
    {
      icon: Brain,
      title: "AI Prediction Status",
      value: "Active",
      subtitle: "Analyzing Next 45 Mins",
      status: "info",
      glow: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  )
}
