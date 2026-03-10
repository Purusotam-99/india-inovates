"use client"

import { useState, useEffect } from "react"
import { Maximize2, Layers, Navigation, Ambulance } from "lucide-react"

interface Road {
  id: string
  d: string
  status: "smooth" | "moderate" | "heavy"
  name: string
}

interface Intersection {
  id: string
  x: number
  y: number
  name: string
  hasCamera: boolean
}

const roads: Road[] = [
  { id: "r1", d: "M 50 200 L 350 200", status: "smooth", name: "NH-16" },
  { id: "r2", d: "M 50 300 L 350 300", status: "moderate", name: "Janpath" },
  { id: "r3", d: "M 50 400 L 350 400", status: "smooth", name: "Cuttack Road" },
  { id: "r4", d: "M 100 100 L 100 500", status: "smooth", name: "Airport Road" },
  { id: "r5", d: "M 200 100 L 200 500", status: "heavy", name: "Jaydev Vihar" },
  { id: "r6", d: "M 300 100 L 300 500", status: "smooth", name: "Nandankanan Rd" },
  { id: "r7", d: "M 350 200 Q 400 200 450 150", status: "smooth", name: "Ring Road" },
  { id: "r8", d: "M 350 300 Q 400 300 450 350", status: "moderate", name: "KIIT Road" },
]

const intersections: Intersection[] = [
  { id: "i1", x: 100, y: 200, name: "Acharya Vihar", hasCamera: true },
  { id: "i2", x: 200, y: 200, name: "Vani Vihar", hasCamera: true },
  { id: "i3", x: 300, y: 200, name: "Sishu Bhawan", hasCamera: true },
  { id: "i4", x: 100, y: 300, name: "Master Canteen", hasCamera: true },
  { id: "i5", x: 200, y: 300, name: "Jaydev Vihar Sq", hasCamera: true },
  { id: "i6", x: 300, y: 300, name: "Fire Station", hasCamera: true },
  { id: "i7", x: 100, y: 400, name: "Patia", hasCamera: false },
  { id: "i8", x: 200, y: 400, name: "Infocity", hasCamera: true },
  { id: "i9", x: 300, y: 400, name: "KIIT Square", hasCamera: true },
]

export function LiveMap() {
  const [ambulancePosition, setAmbulancePosition] = useState({ x: 80, y: 300 })
  const [hoveredRoad, setHoveredRoad] = useState<string | null>(null)

  // Simulate ambulance movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulancePosition((prev) => {
        const newX = prev.x + 2
        if (newX > 320) {
          return { x: 80, y: 300 }
        }
        return { x: newX, y: 300 }
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: Road["status"]) => {
    switch (status) {
      case "smooth":
        return "#34d399"
      case "moderate":
        return "#fbbf24"
      case "heavy":
        return "#fb7185"
    }
  }

  return (
    <div className="relative h-[400px] lg:h-[500px] rounded-xl border border-border bg-card/30 backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-background/80 to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/80 backdrop-blur-sm">
            <Navigation className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium text-foreground">Live Spatial Map</span>
          </div>
          <span className="text-xs text-muted-foreground">Bhubaneswar Grid</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-secondary/80 backdrop-blur-sm hover:bg-secondary transition-colors">
            <Layers className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg bg-secondary/80 backdrop-blur-sm hover:bg-secondary transition-colors">
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Map Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* City Map SVG */}
      <svg viewBox="0 0 500 600" className="absolute inset-0 w-full h-full">
        <defs>
          {/* Glow filters */}
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Roads */}
        {roads.map((road) => (
          <g key={road.id}>
            {/* Road shadow */}
            <path
              d={road.d}
              stroke={getStatusColor(road.status)}
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              opacity="0.2"
            />
            {/* Road line */}
            <path
              d={road.d}
              stroke={getStatusColor(road.status)}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter={
                road.status === "smooth"
                  ? "url(#glow-green)"
                  : road.status === "moderate"
                  ? "url(#glow-yellow)"
                  : "url(#glow-red)"
              }
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredRoad(road.id)}
              onMouseLeave={() => setHoveredRoad(null)}
              style={{
                strokeWidth: hoveredRoad === road.id ? 6 : 4,
              }}
            />
          </g>
        ))}

        {/* Green Corridor Path (Ambulance Route) */}
        <path
          d="M 80 300 L 320 300"
          stroke="#22d3ee"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          opacity="0.2"
          className="animate-pulse"
        />
        <path
          d="M 80 300 L 320 300"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10,5"
          fill="none"
          filter="url(#glow-blue)"
        />

        {/* Intersections */}
        {intersections.map((intersection) => (
          <g key={intersection.id}>
            <circle
              cx={intersection.x}
              cy={intersection.y}
              r="8"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="2"
            />
            <circle
              cx={intersection.x}
              cy={intersection.y}
              r="4"
              fill={intersection.hasCamera ? "#34d399" : "#64748b"}
            />
          </g>
        ))}

        {/* Ambulance Icon */}
        <g transform={`translate(${ambulancePosition.x - 15}, ${ambulancePosition.y - 15})`}>
          {/* Pulse effect */}
          <circle cx="15" cy="15" r="20" fill="#22d3ee" opacity="0.2" className="animate-ping" />
          <circle cx="15" cy="15" r="15" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" filter="url(#glow-blue)" />
          {/* Cross symbol for ambulance */}
          <rect x="12" y="8" width="6" height="14" rx="1" fill="#22d3ee" />
          <rect x="8" y="12" width="14" height="6" rx="1" fill="#22d3ee" />
        </g>

        {/* Hospital Marker */}
        <g transform="translate(310, 285)">
          <rect x="0" y="0" width="30" height="30" rx="4" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
          <text x="15" y="20" textAnchor="middle" className="text-xs fill-neon-cyan font-bold">H</text>
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 p-3 rounded-lg bg-background/80 backdrop-blur-sm border border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 rounded-full bg-neon-emerald" />
          <span className="text-xs text-muted-foreground">Smooth Traffic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 rounded-full bg-neon-amber" />
          <span className="text-xs text-muted-foreground">Moderate Traffic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 rounded-full bg-neon-rose" />
          <span className="text-xs text-muted-foreground">Heavy Traffic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 rounded-full bg-neon-cyan" />
          <span className="text-xs text-muted-foreground">Green Corridor</span>
        </div>
      </div>

      {/* Active Corridor Info */}
      <div className="absolute bottom-4 right-4 p-3 rounded-lg bg-neon-cyan/10 backdrop-blur-sm border border-neon-cyan/30">
        <div className="flex items-center gap-2 mb-1">
          <Ambulance className="w-4 h-4 text-neon-cyan" />
          <span className="text-xs font-medium text-neon-cyan">Active Green Corridor</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Unit 4 → Apollo Hospital
        </p>
        <p className="text-sm font-bold text-foreground mt-1">ETA: 2 min</p>
      </div>
    </div>
  )
}
