'use client'

import React from "react"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, LogOut } from 'lucide-react'
import { RoleSidebar } from '@/components/role-sidebar'
import type { UserRole } from '@/lib/role-context'

interface DashboardContentProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  children: React.ReactNode
}

export default function DashboardContent({ collapsed, setCollapsed, children }: DashboardContentProps) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole | null
    const paramRole = searchParams.get('role') as UserRole | null
    const finalRole = paramRole || savedRole

    if (finalRole) {
      setRole(finalRole)
    } else {
      router.push('/')
    }
    setMounted(true)
  }, [searchParams, router])

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    router.push('/')
  }

  if (!mounted) return null

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="mx-auto max-w-screen-2xl px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle sidebar"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="size-5" />
          </Button>
          <Link href="/dashboard" className="font-semibold text-pretty">
            School Management System
          </Link>
          {role && (
            <div className="ml-auto flex items-center gap-4">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">
                {role}
              </span>
              <span className="text-xs text-muted-foreground">Prototype – Ideathon Demo</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="grid" style={{ gridTemplateColumns: collapsed ? '56px 1fr' : '260px 1fr' }}>
        <aside className="border-r bg-sidebar sticky top-[57px] h-[calc(100dvh-57px)]">
          <RoleSidebar collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} role={role} />
        </aside>
        <main className="min-h-[calc(100dvh-57px)] bg-background">
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
