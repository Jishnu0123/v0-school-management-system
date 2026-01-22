'use client'

import type React from 'react'
import { Suspense } from 'react'

import Link from 'next/link'
import { useState } from 'react'
import { RoleSidebar } from '@/components/role-sidebar'
import { Button } from '@/components/ui/button'
import { Menu, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { UserRole } from '@/lib/role-context'
import DashboardContent from './dashboard-content'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Suspense
      fallback={
        <div className="min-h-dvh">
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="mx-auto max-w-screen-2xl px-4 py-3 flex items-center gap-3">
              <Button variant="ghost" size="icon" aria-label="Toggle sidebar" disabled>
                <Menu className="size-5" />
              </Button>
              <Link href="/dashboard" className="font-semibold text-pretty">
                School Management System
              </Link>
            </div>
          </header>
        </div>
      }
    >
      <DashboardContent collapsed={collapsed} setCollapsed={setCollapsed}>
        {children}
      </DashboardContent>
    </Suspense>
  )
}
