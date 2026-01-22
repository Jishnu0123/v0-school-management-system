"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  UserRound,
  ClipboardList,
  FileBarChart2,
  FileText,
  Megaphone,
  ChevronLeft,
  Bot,
  UserCircle,
  Settings,
  DollarSign,
  Award,
} from "lucide-react"
import { usePathname } from "next/navigation"

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/students", label: "Students", icon: Users },
  { href: "/dashboard/teachers", label: "Teachers", icon: UserRound },
  { href: "/dashboard/attendance", label: "Attendance", icon: ClipboardList },
  { href: "/dashboard/exams", label: "Exams & Marks", icon: FileBarChart2 },
  { href: "/dashboard/finance", label: "Finance", icon: DollarSign },
  { href: "/dashboard/certificates", label: "Certificates", icon: Award },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/announcements", label: "Announcements", icon: Megaphone },
  { href: "/dashboard/chatbot", label: "Chatbot", icon: Bot },
  { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function Sidebar({
  collapsed,
  onCollapse,
}: {
  collapsed?: boolean
  onCollapse?: () => void
}) {
  const pathname = usePathname()
  return (
    <div className="flex h-full flex-col">
      <div className="p-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-full"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onCollapse}
        >
          <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                    active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-muted",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-2 text-xs text-muted-foreground">
        {!collapsed && <p className="text-pretty">v0 preview UI</p>}
      </div>
    </div>
  )
}
