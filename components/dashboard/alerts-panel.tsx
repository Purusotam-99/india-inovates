"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { 
  AlertTriangle, 
  Ambulance, 
  Brain, 
  Clock, 
  ChevronRight,
  Bell 
} from "lucide-react"

interface Alert {
  id: string
  type: "warning" | "emergency" | "ai" | "info"
  title: string
  description: string
  time: string
  isNew?: boolean
}

const initialAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Congestion Predicted",
    description: "Jaydev Vihar intersection in 15 mins",
    time: "Just now",
    isNew: true,
  },
  {
    id: "2",
    type: "emergency",
    title: "Ambulance Unit 4",
    description: "2 mins to Apollo Hospital",
    time: "Active",
    isNew: true,
  },
  {
    id: "3",
    type: "ai",
    title: "AI Recommendation",
    description: "Extend green phase at Master Canteen Sq by 15s",
    time: "2 min ago",
  },
  {
    id: "4",
    type: "info",
    title: "Signal Sync Complete",
    description: "NH-16 corridor optimized",
    time: "5 min ago",
  },
  {
    id: "5",
    type: "warning",
    title: "High Latency Detected",
    description: "Edge Node 42 experiencing delays",
    time: "8 min ago",
  },
  {
    id: "6",
    type: "ai",
    title: "Pattern Detected",
    description: "School zone traffic expected at 3:30 PM",
    time: "12 min ago",
  },
]

function AlertIcon({ type }: { type: Alert["type"] }) {
  switch (type) {
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-neon-amber" />
    case "emergency":
      return <Ambulance className="w-4 h-4 text-neon-cyan" />
    case "ai":
      return <Brain className="w-4 h-4 text-neon-cyan" />
    case "info":
      return <Clock className="w-4 h-4 text-muted-foreground" />
  }
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [newAlertAnimation, setNewAlertAnimation] = useState(false)

  // Simulate new alerts coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAlerts = [
        {
          type: "ai" as const,
          title: "Flow Optimization",
          description: "Ring Road throughput improved by 12%",
        },
        {
          type: "warning" as const,
          title: "Sensor Anomaly",
          description: "Camera 23 reporting intermittent signal",
        },
        {
          type: "info" as const,
          title: "Route Updated",
          description: "Alternative route calculated for KIIT Road",
        },
      ]

      const randomAlert = randomAlerts[Math.floor(Math.random() * randomAlerts.length)]
      const newAlert: Alert = {
        id: Date.now().toString(),
        ...randomAlert,
        time: "Just now",
        isNew: true,
      }

      setNewAlertAnimation(true)
      setAlerts((prev) => [newAlert, ...prev.slice(0, 5)])

      setTimeout(() => setNewAlertAnimation(false), 500)
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[400px] lg:h-[500px] rounded-xl border border-border bg-card/30 backdrop-blur-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="w-4 h-4 text-neon-cyan" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon-rose animate-pulse" />
          </div>
          <span className="text-sm font-medium text-foreground">AI Alerts & Emergency Feed</span>
        </div>
        <button className="text-xs text-neon-cyan hover:underline">View All</button>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div
              key={alert.id}
              className={cn(
                "p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:bg-secondary/50",
                alert.type === "warning" && "border-neon-amber/30 bg-neon-amber/5",
                alert.type === "emergency" && "border-neon-cyan/30 bg-neon-cyan/5",
                alert.type === "ai" && "border-neon-cyan/20 bg-neon-cyan/5",
                alert.type === "info" && "border-border bg-secondary/30",
                index === 0 && newAlertAnimation && "animate-pulse scale-[1.02]"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-1.5 rounded-lg shrink-0",
                  alert.type === "warning" && "bg-neon-amber/20",
                  alert.type === "emergency" && "bg-neon-cyan/20",
                  alert.type === "ai" && "bg-neon-cyan/20",
                  alert.type === "info" && "bg-secondary"
                )}>
                  <AlertIcon type={alert.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-foreground truncate">
                      {alert.title}
                    </p>
                    {alert.isNew && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-neon-cyan/20 text-neon-cyan">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {alert.description}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">
                    {alert.time}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Status Bar */}
      <div className="p-3 border-t border-border bg-neon-cyan/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-neon-cyan" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            </div>
            <span className="text-xs text-neon-cyan font-medium">V2X Active</span>
          </div>
          <span className="text-xs text-muted-foreground">2 Emergency Corridors</span>
        </div>
      </div>
    </div>
  )
}
