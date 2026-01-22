"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Phone, MapPin, Building2, Save, Shield, GraduationCap, Calendar, Hash } from "lucide-react"

// Dummy student data
const dummyStudents = [
  {
    id: "s1",
    name: "Aarav Kumar",
    roll: "001",
    email: "aarav.kumar@school.gov",
    phone: "9876543210",
    class: "10-A",
    dateOfBirth: "2010-05-15",
    address: "123 MG Road, Bangalore",
    parentName: "Rajesh Kumar",
    parentPhone: "9876543211",
    bloodGroup: "O+",
    admissionDate: "2020-04-01",
  },
  {
    id: "s2",
    name: "Diya Sharma",
    roll: "002",
    email: "diya.sharma@school.gov",
    phone: "9876543212",
    class: "10-A",
    dateOfBirth: "2010-07-22",
    address: "456 Brigade Road, Bangalore",
    parentName: "Amit Sharma",
    parentPhone: "9876543213",
    bloodGroup: "A+",
    admissionDate: "2020-04-01",
  },
  {
    id: "s3",
    name: "Arjun Patel",
    roll: "003",
    email: "arjun.patel@school.gov",
    phone: "9876543214",
    class: "10-A",
    dateOfBirth: "2010-03-10",
    address: "789 Residency Road, Bangalore",
    parentName: "Vikram Patel",
    parentPhone: "9876543215",
    bloodGroup: "B+",
    admissionDate: "2020-04-01",
  },
]

export default function ProfilePage() {
  const [role, setRole] = useState<string>('admin')
  const [studentId, setStudentId] = useState<string>('')
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@school.gov",
    phone: "9876543210",
    role: "Admin",
    address: "123 School Street, Education District",
    schoolName: "Government High School",
    employeeId: "EMP001",
    department: "Administration",
    // Student-specific fields
    rollNumber: "",
    class: "",
    dateOfBirth: "",
    parentName: "",
    parentPhone: "",
    bloodGroup: "",
    admissionDate: "",
  })

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'admin'
    const savedStudentId = localStorage.getItem('studentId') || 's1'
    setRole(savedRole)
    setStudentId(savedStudentId)

    // Load student-specific profile
    if (savedRole === 'student') {
      const student = dummyStudents.find(s => s.id === savedStudentId) || dummyStudents[0]
      setProfile({
        name: student.name,
        email: student.email,
        phone: student.phone,
        role: "Student",
        address: student.address,
        schoolName: "Government High School",
        employeeId: "",
        department: "",
        rollNumber: student.roll,
        class: student.class,
        dateOfBirth: student.dateOfBirth,
        parentName: student.parentName,
        parentPhone: student.parentPhone,
        bloodGroup: student.bloodGroup,
        admissionDate: student.admissionDate,
      })
    }
  }, [])

  const [saveStatus, setSaveStatus] = useState("")

  const handleSave = () => {
    setSaveStatus("Saving...")
    setTimeout(() => {
      setSaveStatus("✓ Profile updated successfully!")
      setTimeout(() => setSaveStatus(""), 3000)
    }, 1000)
  }

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
          <CardDescription>Update your personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 text-2xl">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.role}</p>
              {role === 'student' && (
                <p className="text-sm text-muted-foreground">Roll No: {profile.rollNumber} | Class: {profile.class}</p>
              )}
              <Button variant="outline" size="sm" className="mt-2">
                Change Photo
              </Button>
            </div>
          </div>

          {role === 'student' ? (
            /* Student-specific fields */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="roll" className="flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    Roll Number
                  </Label>
                  <Input
                    id="roll"
                    value={profile.rollNumber}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class" className="flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    Class
                  </Label>
                  <Input
                    id="class"
                    value={profile.class}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dob" className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="email@school.gov"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="9876543210"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="blood-group">Blood Group</Label>
                  <Input
                    id="blood-group"
                    value={profile.bloodGroup}
                    onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                    placeholder="O+"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="admission-date">Admission Date</Label>
                  <Input
                    id="admission-date"
                    type="date"
                    value={profile.admissionDate}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Address
                </Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  placeholder="Your address"
                  rows={2}
                />
              </div>

              <div className="p-4 bg-muted/30 rounded-lg border">
                <h4 className="font-semibold mb-3">Parent/Guardian Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="parent-name">Parent Name</Label>
                    <Input
                      id="parent-name"
                      value={profile.parentName}
                      onChange={(e) => setProfile({ ...profile, parentName: e.target.value })}
                      placeholder="Parent full name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="parent-phone">Parent Phone</Label>
                    <Input
                      id="parent-phone"
                      value={profile.parentPhone}
                      onChange={(e) => setProfile({ ...profile, parentPhone: e.target.value })}
                      placeholder="9876543210"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="school-name" className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  School Name
                </Label>
                <Input
                  id="school-name"
                  value={profile.schoolName}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          ) : (
            /* Admin/Teacher/Parent fields */
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="employee-id">Employee ID</Label>
              <Input
                id="employee-id"
                value={profile.employeeId}
                onChange={(e) => setProfile({ ...profile, employeeId: e.target.value })}
                placeholder="EMP001"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="email@school.gov"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Phone
              </Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="9876543210"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Role
              </Label>
              <Select value={profile.role} onValueChange={(val) => setProfile({ ...profile, role: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Parent">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                placeholder="Administration"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address" className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Address
            </Label>
            <Textarea
              id="address"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              placeholder="Your address"
              rows={2}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="school-name" className="flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              School Name
            </Label>
            <Input
              id="school-name"
              value={profile.schoolName}
              onChange={(e) => setProfile({ ...profile, schoolName: e.target.value })}
              placeholder="School name"
            />
          </div>
        </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your password and security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" placeholder="••••••••" />
          </div>
          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {saveStatus && (
            <span className={saveStatus.includes('✓') ? 'text-green-600' : ''}>
              {saveStatus}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
