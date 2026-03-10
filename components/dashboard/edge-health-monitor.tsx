"use client"

import { cn } from "@/lib/utils"
import { 
  Server, 
  Camera, 
  Thermometer, 
  Wifi,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from "lucide-react"

interface EdgeNode {
  id: string
  nodeId: string
  cameraStatus: "online" | "offline" | "warning"
  cpuTemp: number
  pingLatency: number
  status: "healthy" | "warning" | "critical"
}

const edgeNodes: EdgeNode[] = [
  { id: "1", nodeId: "Node 17", cameraStatus: "online", cpuTemp: 42, pingLatency: 12, status: "healthy" },
  { id: "2", nodeId: "Node 23", cameraStatus: "online", cpuTemp: 48, pingLatency: 18, status: "healthy" },
  { id: "3", nodeId: "Node 42", cameraStatus: "offline", cpuTemp: 67, pingLatency: 245, status: "critical" },
  { id: "4", nodeId: "Node 56", cameraStatus: "warning", cpuTemp: 55, pingLatency: 45, status: "warning" },
  { id: "5", nodeId: "Node 89", cameraStatus: "online", cpuTemp: 38, pingLatency: 8, status: "healthy" },
]

function StatusBadge({ status }: { status: EdgeNode["status"] }) {
  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
      status === "healthy" && "bg-neon-emerald/20 text-neon-emerald",
      status === "warning" && "bg-neon-amber/20 text-neon-amber",
      status === "critical" && "bg-neon-rose/20 text-neon-rose"
    )}>
      {status === "healthy" && <CheckCircle2 className="w-3 h-3" />}
      {status === "warning" && <AlertTriangle className="w-3 h-3" />}
      {status === "critical" && <XCircle className="w-3 h-3" />}
      <span className="capitalize">{status}</span>
    </div>
  )
}

function CameraStatus({ status }: { status: EdgeNode["cameraStatus"] }) {
  return (
    <div className={cn(
      "flex items-center gap-1.5",
      status === "online" && "text-neon-emerald",
      status === "warning" && "text-neon-amber",
      status === "offline" && "text-neon-rose"
    )}>
      <Camera className="w-4 h-4" />
      <span className="text-xs font-medium capitalize">{status}</span>
    </div>
  )
}

export function EdgeHealthMonitor() {
  const healthyCount = edgeNodes.filter((n) => n.status === "healthy").length
  const warningCount = edgeNodes.filter((n) => n.status === "warning").length
  const criticalCount = edgeNodes.filter((n) => n.status === "critical").length

  return (
    <div className="rounded-xl border border-border bg-card/30 backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-neon-cyan" />
          <span className="text-sm font-medium text-foreground">Edge Health Monitor</span>
          <span className="text-xs text-muted-foreground">(Daemon Vitals)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-neon-emerald" />
            <span className="text-xs text-muted-foreground">{healthyCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-neon-amber" />
            <span className="text-xs text-muted-foreground">{warningCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-neon-rose" />
            <span className="text-xs text-muted-foreground">{criticalCount}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Node ID</th>
              <th className="text-center text-xs font-medium text-muted-foreground py-3 px-4">Camera</th>
              <th className="text-center text-xs font-medium text-muted-foreground py-3 px-4">CPU Temp</th>
              <th className="text-center text-xs font-medium text-muted-foreground py-3 px-4">Ping</th>
              <th className="text-center text-xs font-medium text-muted-foreground py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {edgeNodes.map((node) => (
              <tr 
                key={node.id} 
                className={cn(
                  "border-b border-border/50 transition-colors",
                  node.status === "critical" && "bg-neon-rose/5"
                )}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Server className={cn(
                      "w-4 h-4",
                      node.status === "healthy" && "text-neon-emerald",
                      node.status === "warning" && "text-neon-amber",
                      node.status === "critical" && "text-neon-rose"
                    )} />
                    <span className={cn(
                      "text-sm font-medium",
                      node.status === "critical" ? "text-neon-rose" : "text-foreground"
                    )}>
                      {node.nodeId}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center">
                    <CameraStatus status={node.cameraStatus} />
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg",
                    node.cpuTemp < 50 && "bg-neon-emerald/10 text-neon-emerald",
                    node.cpuTemp >= 50 && node.cpuTemp < 60 && "bg-neon-amber/10 text-neon-amber",
                    node.cpuTemp >= 60 && "bg-neon-rose/10 text-neon-rose"
                  )}>
                    <Thermometer className="w-3 h-3" />
                    <span className="text-xs font-mono">{node.cpuTemp}°C</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg",
                    node.pingLatency < 30 && "bg-neon-emerald/10 text-neon-emerald",
                    node.pingLatency >= 30 && node.pingLatency < 100 && "bg-neon-amber/10 text-neon-amber",
                    node.pingLatency >= 100 && "bg-neon-rose/10 text-neon-rose"
                  )}>
                    <Wifi className="w-3 h-3" />
                    <span className="text-xs font-mono">{node.pingLatency}ms</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center">
                    <StatusBadge status={node.status} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Critical Alert Footer */}
      <div className="p-3 bg-neon-rose/5 border-t border-neon-rose/20">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-neon-rose animate-pulse" />
          <p className="text-xs text-neon-rose">
            <span className="font-bold">Node 42:</span> Camera Offline - High Latency Detected. Technician dispatched.
          </p>
        </div>
      </div>
    </div>
  )
}
