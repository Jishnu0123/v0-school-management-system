'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent'

interface RoleContextType {
  role: UserRole | null
  setRole: (role: UserRole | null) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load role from localStorage on mount
    const savedRole = localStorage.getItem('userRole') as UserRole | null
    setRole(savedRole)
    setMounted(true)
  }, [])

  useEffect(() => {
    // Save role to localStorage
    if (role) {
      localStorage.setItem('userRole', role)
    } else {
      localStorage.removeItem('userRole')
    }
  }, [role])

  if (!mounted) return children

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error('useRole must be used within RoleProvider')
  }
  return context
}
