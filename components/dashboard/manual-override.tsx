"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  TrafficCone, 
  AlertTriangle, 
  Check,
  Timer
} from "lucide-react"

interface Intersection {
  id: string
  name: string
  currentLight: "green" | "red"
  greenDuration: number
  redDuration: number
  isOverridden: boolean
}

const initialIntersections: Intersection[] = [
  { id: "1", name: "Jaydev Vihar Square", currentLight: "green", greenDuration: 45, redDuration: 60, isOverridden: false },
  { id: "2", name: "Master Canteen Square", currentLight: "red", greenDuration: 40, redDuration: 55, isOverridden: false },
  { id: "3", name: "Acharya Vihar Square", currentLight: "green", greenDuration: 35, redDuration: 50, isOverridden: false },
  { id: "4", name: "Vani Vihar Square", currentLight: "red", greenDuration: 30, redDuration: 45, isOverridden: true },
]

export function ManualOverride() {
  const [intersections, setIntersections] = useState(initialIntersections)
  const [confirmingOverride, setConfirmingOverride] = useState<string | null>(null)

  const handleOverride = (id: string) => {
    if (confirmingOverride === id) {
      // Confirm the override
      setIntersections((prev) =>
        prev.map((intersection) =>
          intersection.id === id
            ? { ...intersection, isOverridden: !intersection.isOverridden, currentLight: "green" }
            : intersection
        )
      )
      setConfirmingOverride(null)
    } else {
      // Start confirmation
      setConfirmingOverride(id)
      setTimeout(() => setConfirmingOverride(null), 3000)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card/30 backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <TrafficCone className="w-4 h-4 text-neon-amber" />
          <span className="text-sm font-medium text-foreground">Manual Override & Signal Status</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-neon-amber" />
          <span className="text-xs text-neon-amber">1 Override Active</span>
        </div>
      </div>

      {/* Intersections Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Intersection</th>
              <th className="text-center text-xs font-medium text-muted-foreground py-3 px-4">Status</th>
              <th className="text-center text-xs font-medium text-muted-foreground py-3 px-4">
                <span className="text-neon-emerald">Green</span>
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground py-3 px-4">
                <span className="text-neon-rose">Red</span>
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {intersections.map((intersection) => (
              <tr 
                key={intersection.id} 
                className={cn(
                  "border-b border-border/50 transition-colors",
                  intersection.isOverridden && "bg-neon-amber/5"
                )}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {intersection.isOverridden && (
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-amber animate-pulse" />
                    )}
                    <span className="text-sm text-foreground">{intersection.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className={cn(
                      "w-3 h-3 rounded-full shadow-lg",
                      intersection.currentLight === "green" 
                        ? "bg-neon-emerald shadow-neon-emerald/50" 
                        : "bg-neon-rose shadow-neon-rose/50"
                    )} />
                    <span className={cn(
                      "text-xs font-medium uppercase",
                      intersection.currentLight === "green" ? "text-neon-emerald" : "text-neon-rose"
                    )}>
                      {intersection.currentLight}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Timer className="w-3 h-3 text-neon-emerald" />
                    <span className="text-sm text-foreground font-mono">{intersection.greenDuration}s</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Timer className="w-3 h-3 text-neon-rose" />
                    <span className="text-sm text-foreground font-mono">{intersection.redDuration}s</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleOverride(intersection.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200",
                      intersection.isOverridden
                        ? "bg-neon-emerald/20 text-neon-emerald border border-neon-emerald/30 hover:bg-neon-emerald/30"
                        : confirmingOverride === intersection.id
                        ? "bg-neon-rose text-white animate-pulse"
                        : "bg-neon-rose/20 text-neon-rose border border-neon-rose/30 hover:bg-neon-rose/30"
                    )}
                  >
                    {intersection.isOverridden ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Active
                      </span>
                    ) : confirmingOverride === intersection.id ? (
                      "Confirm?"
                    ) : (
                      "Override"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Warning */}
      <div className="p-3 bg-neon-amber/5 border-t border-neon-amber/20">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-neon-amber shrink-0" />
          <p className="text-xs text-neon-amber">
            Manual overrides require supervisor authorization. All actions are logged.
          </p>
        </div>
      </div>
    </div>
  )
}
