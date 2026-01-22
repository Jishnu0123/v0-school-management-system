'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import LoginModal from '@/components/login-modal'
import ChatbotWidget from '@/components/chatbot-widget'
import { BookOpen, Users, Clock, Award, BarChart3, Lock } from 'lucide-react'

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Prototype Banner */}
      <div className="bg-accent/10 border-b border-accent/20 px-6 py-2 text-center text-sm text-foreground">
        <span className="font-medium">Prototype – Ideathon Demo</span>
      </div>

      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Government School Management System</h1>
                <p className="text-sm text-muted-foreground">A Role-Based Digital Platform for Government Schools</p>
              </div>
            </div>
          </div>
          <Button onClick={() => setIsLoginOpen(true)} variant="outline" className="border-primary text-primary">
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                Manage Government Schools with Ease
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-balance leading-relaxed">
                This system digitizes core school operations including student records, attendance tracking, academic performance, and communication between administrators, teachers, students, and parents — all through a secure, role-based platform.
              </p>
              <Button
                onClick={() => setIsLoginOpen(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Get Started
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all">
                <Users className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Student Management</h3>
                <p className="text-sm text-muted-foreground">Centralized student profiles and academic records</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all">
                <Clock className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Attendance Tracking</h3>
                <p className="text-sm text-muted-foreground">Class-wise and student-wise attendance monitoring</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all">
                <BarChart3 className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Academic Performance</h3>
                <p className="text-sm text-muted-foreground">Marks, subjects, and progress tracking</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all">
                <Award className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Reports & Certificates</h3>
                <p className="text-sm text-muted-foreground">Automated reports and certificate generation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Access Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Designed for Every School Stakeholder</h2>
            <p className="text-lg text-muted-foreground">Role-based access ensures each user sees only relevant data</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Admin Role */}
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground">Admin</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                School administration and oversight. Full system access for configuration and reporting.
              </p>
            </div>

            {/* Teacher Role */}
            <div className="p-6 rounded-xl bg-secondary/5 border border-secondary/20 hover:border-secondary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h3 className="font-bold text-foreground">Teacher</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Academic and attendance management. Access to assigned classes and student data only.
              </p>
            </div>

            {/* Student Role */}
            <div className="p-6 rounded-xl bg-accent/5 border border-accent/20 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-foreground">Student</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Personal academic tracking. View own attendance, marks, and performance data only.
              </p>
            </div>

            {/* Parent Role */}
            <div className="p-6 rounded-xl bg-chart-4/10 border border-chart-4/30 hover:border-chart-4/60 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-chart-4 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-foreground">Parent</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Attendance and performance visibility. Monitor child data and school communications only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-sm mb-3">
            Concept prototype developed for Allianz Tech Championship 2025
          </p>
          <p className="text-muted-foreground text-xs">
            Future-ready and scalable for government education systems
          </p>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Chatbot */}
      <ChatbotWidget />
    </div>
  )
}
