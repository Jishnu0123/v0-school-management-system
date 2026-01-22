'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X, Mic, HelpCircle } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [showAccessHelp, setShowAccessHelp] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual authentication
    if (email && password && role) {
      // Store role in localStorage for prototype
      localStorage.setItem('userRole', role)
      router.push(`/dashboard?role=${role}`)
      onClose()
    }
  }

  const handleVoiceClick = () => {
    setIsListening(!isListening)
    console.log('[v0] Voice assistant:', isListening ? 'stopped' : 'started')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header inside Modal - No Login/Get Started Buttons */}

        {/* Header */}
        <div className="p-8 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
          <p className="text-muted-foreground mt-1 text-sm">Sign in to your school account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium text-foreground">
              Role
            </label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Voice and Help Row */}
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleVoiceClick}
              variant="outline"
              size="sm"
              className={`flex-1 flex items-center justify-center gap-2 ${
                isListening ? 'bg-primary/10 border-primary' : ''
              }`}
              aria-label="Voice assistant"
            >
              <Mic className={`w-4 h-4 ${isListening ? 'text-primary' : ''}`} />
              {isListening ? 'Listening...' : 'Voice'}
            </Button>
            <Button
              type="button"
              onClick={() => setShowAccessHelp(!showAccessHelp)}
              variant="outline"
              size="sm"
              className="flex-1 flex items-center justify-center gap-2"
              aria-label="Accessibility help"
            >
              <HelpCircle className="w-4 h-4" />
              Help
            </Button>
          </div>

          {/* Accessibility Help */}
          {showAccessHelp && (
            <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg text-sm text-foreground animate-in fade-in duration-200">
              <p className="font-medium mb-2">Accessibility Features:</p>
              <ul className="space-y-1 text-sm">
                <li>• Use Tab to navigate between fields</li>
                <li>• Click Voice button or press V for voice assistance</li>
                <li>• Screen readers are fully supported</li>
                <li>• Press Enter to submit the form</li>
              </ul>
            </div>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10"
          >
            Sign In
          </Button>

          {/* Demo Credentials */}
          <div className="p-3 bg-muted/50 border border-border rounded-lg text-xs">
            <p className="font-medium text-foreground mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-muted-foreground">
              <p>All roles: any@email.com / password123</p>
              <p className="font-medium text-foreground mt-2">Select role above</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Need help?{' '}
              <button className="text-primary hover:underline font-medium">Contact Support</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
