'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
  BookOpen,
  Award,
  BarChart3,
  User,
} from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { UserRole } from '@/lib/role-context'

const menuItems: Record<UserRole, { href: string; label: string; icon: any }[]> = {
  admin: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/students', label: 'Students', icon: Users },
    { href: '/dashboard/teachers', label: 'Teachers', icon: UserRound },
    { href: '/dashboard/attendance', label: 'Attendance', icon: ClipboardList },
    { href: '/dashboard/exams', label: 'Exams & Marks', icon: FileBarChart2 },
    { href: '/dashboard/reports', label: 'Reports', icon: FileText },
    { href: '/dashboard/announcements', label: 'Announcements', icon: Megaphone },
    { href: '/dashboard/certificates', label: 'Certificate Generator', icon: Award },
  ],
  teacher: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/my-classes', label: 'My Classes', icon: Users },
    { href: '/dashboard/attendance', label: 'Attendance', icon: ClipboardList },
    { href: '/dashboard/exams', label: 'Exams & Marks', icon: FileBarChart2 },
    { href: '/dashboard/student-performance', label: 'Student Performance', icon: BarChart3 },
    { href: '/dashboard/announcements', label: 'Announcements', icon: Megaphone },
  ],
  student: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/my-attendance', label: 'My Attendance', icon: ClipboardList },
    { href: '/dashboard/my-marks', label: 'My Marks', icon: FileBarChart2 },
    { href: '/dashboard/subjects', label: 'Subjects', icon: BookOpen },
    { href: '/dashboard/certificates', label: 'Certificates', icon: Award },
    { href: '/dashboard/announcements', label: 'Announcements', icon: Megaphone },
  ],
  parent: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/child-profile', label: 'Child Profile', icon: User },
    { href: '/dashboard/attendance-summary', label: 'Attendance Summary', icon: ClipboardList },
    { href: '/dashboard/academic-performance', label: 'Academic Performance', icon: BarChart3 },
    { href: '/dashboard/announcements', label: 'Announcements', icon: Megaphone },
  ],
}

export function RoleSidebar({
  collapsed,
  onCollapse,
  role,
}: {
  collapsed?: boolean
  onCollapse?: () => void
  role: UserRole | null
}) {
  const pathname = usePathname()
  const items = role ? menuItems[role] : []

  return (
    <div className="flex h-full flex-col">
      <div className="p-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-full"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={onCollapse}
        >
          <ChevronLeft className={cn('size-4 transition-transform', collapsed && 'rotate-180')} />
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
                    'flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors',
                    active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-muted'
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
      <div className="p-2 text-xs text-muted-foreground border-t border-border">
        {!collapsed && (
          <div>
            <p className="font-medium capitalize text-foreground mb-1">{role || 'Unknown'}</p>
            <p className="text-pretty">Prototype – Ideathon Demo</p>
          </div>
        )}
      </div>
    </div>
  )
}
