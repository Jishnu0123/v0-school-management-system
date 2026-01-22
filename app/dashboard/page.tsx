'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MetricCard } from '@/components/metric-card'
import { AttendanceTrend } from '@/components/charts/attendance-trend'
import { PerformanceChart } from '@/components/charts/performance-chart'
import { Suspense } from 'react'
import type { UserRole } from '@/lib/role-context'
import Loading from './loading'

function AdminDashboard({ name }: { name: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back, {name}</p>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
          Full System Access
        </span>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Students" value="1,254" hint="+12 this week" />
        <MetricCard title="Total Teachers" value="78" hint="2 new hires" />
        <MetricCard title="Avg Attendance" value="93%" hint="School-wide" />
        <MetricCard title="Upcoming Exams" value="4" hint="Next 2 weeks" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AttendanceTrend title="School-wide Attendance Trend" />
        <PerformanceChart title="Subject-wise Performance" />
      </section>
    </div>
  )
}

function TeacherDashboard({ name }: { name: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back, {name}</p>
          <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">
          Class Access Only
        </span>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Assigned Classes" value="4" hint="120 students total" />
        <MetricCard title="Today's Attendance %" value="96%" hint="All classes" />
        <MetricCard title="Pending Attendance" value="2" hint="To mark" />
        <MetricCard title="Upcoming Exams" value="3" hint="Your subjects" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AttendanceTrend title="Class-wise Attendance Trend" />
        <PerformanceChart title="Subject Performance (Assigned)" />
      </section>
    </div>
  )
}

function StudentDashboard({ name }: { name: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back, {name}</p>
          <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">
          Read-only Access
        </span>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Attendance %" value="94%" hint="Current year" />
        <MetricCard title="Upcoming Exams" value="5" hint="Next 30 days" />
        <MetricCard title="Average Score" value="87%" hint="Overall score" />
        <MetricCard title="Skill Progress" value="6/8" hint="Completed" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AttendanceTrend title="Your Attendance Trend" />
        <PerformanceChart title="Subject-wise Marks" />
      </section>
    </div>
  )
}

function ParentDashboard({ name }: { name: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back, {name}</p>
          <h1 className="text-3xl font-bold text-foreground">Parent Dashboard</h1>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">
          Child Data Only
        </span>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Child Attendance %" value="92%" hint="Current term" />
        <MetricCard title="Upcoming Exams" value="4" hint="Next 2 weeks" />
        <MetricCard title="Recent Scores" value="85%" hint="Latest test" />
        <MetricCard title="Notifications" value="3" hint="Unread" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AttendanceTrend title="Child Attendance Trend" />
        <PerformanceChart title="Subject Performance" />
      </section>
    </div>
  )
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const [name, setName] = useState('User')
  const role = (searchParams.get('role') || localStorage.getItem('userRole')) as UserRole | null

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || localStorage.getItem('studentName')
    const fallback = role === 'teacher' ? 'Teacher' : role === 'student' ? 'Student' : role === 'parent' ? 'Parent' : 'Admin'
    setName(storedName || fallback)
  }, [role])

  if (!role) return null

  switch (role) {
    case 'admin':
      return <AdminDashboard name={name} />
    case 'teacher':
      return <TeacherDashboard name={name} />
    case 'student':
      return <StudentDashboard name={name} />
    case 'parent':
      return <ParentDashboard name={name} />
    default:
      return <AdminDashboard name={name} />
  }
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardContent />
    </Suspense>
  )
}
