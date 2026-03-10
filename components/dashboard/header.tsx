"use client"

import { Shield, Bell, User } from "lucide-react"

interface HeaderProps {
  currentTime: Date
}

export function Header({ currentTime }: HeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6">
      {/* Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg lg:text-xl font-bold text-foreground tracking-tight">
          TOC Central Command
        </h1>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-emerald/10 border border-neon-emerald/30">
          <div className="relative">
            <Shield className="w-4 h-4 text-neon-emerald" />
            <div className="absolute inset-0 text-neon-emerald animate-pulse opacity-50">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xs font-medium text-neon-emerald uppercase tracking-wider">
            System Healthy
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Live Clock */}
        <div className="hidden md:flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-rose animate-pulse" />
            <span className="text-sm font-mono text-foreground tracking-wider">
              {formatTime(currentTime)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDate(currentTime)}
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-neon-amber animate-pulse" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors">
          <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center">
            <User className="w-4 h-4 text-neon-cyan" />
          </div>
          <span className="hidden lg:block text-sm font-medium text-foreground">
            Operator
          </span>
        </button>
      </div>
    </header>
  )
}
