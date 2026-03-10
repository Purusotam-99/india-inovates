"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  Siren,
  Activity,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Map, label: "Live Map", active: false },
  { icon: Siren, label: "Emergency Corridors", active: false },
  { icon: Activity, label: "System Health", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Settings, label: "Manual Override", active: false },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "relative flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-neon-emerald/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-neon-emerald" />
            </div>
            <div className="absolute inset-0 rounded-lg bg-neon-emerald/20 animate-ping opacity-50" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-foreground whitespace-nowrap">
              TOC
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  item.active
                    ? "bg-neon-emerald/10 text-neon-emerald"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    item.active && "drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  )}
                />
                {!collapsed && (
                  <span className="text-sm font-medium truncate">
                    {item.label}
                  </span>
                )}
                {item.active && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Status Indicator */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-neon-emerald" />
            <div className="absolute inset-0 rounded-full bg-neon-emerald animate-ping opacity-75" />
          </div>
          {!collapsed && (
            <span className="text-xs text-muted-foreground">
              System Online
            </span>
          )}
        </div>
      </div>
    </aside>
  )
}
