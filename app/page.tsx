"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { LiveMap } from "@/components/dashboard/live-map"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { ManualOverride } from "@/components/dashboard/manual-override"
import { EdgeHealthMonitor } from "@/components/dashboard/edge-health-monitor"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header currentTime={currentTime} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {/* KPI Cards */}
          <KPICards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6 mt-4 lg:mt-6">
            {/* Live Map - Takes 3 columns */}
            <div className="xl:col-span-3">
              <LiveMap />
            </div>

            {/* Alerts Panel - Takes 1 column */}
            <div className="xl:col-span-1">
              <AlertsPanel />
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4 lg:mt-6">
            <ManualOverride />
            <EdgeHealthMonitor />
          </div>
        </main>
      </div>
    </div>
  )
}
