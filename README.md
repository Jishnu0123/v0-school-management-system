# School Management System

*A comprehensive role-based digital platform for Government Schools*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/jishnucs24-8713s-projects/v0-school-management-system)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/uaHJHn8i5Fv)

## 🎯 Overview

This is a **full-featured school management system** designed specifically for government educational institutions. The platform digitizes core school operations including student records, attendance tracking, academic performance monitoring, and communication between administrators, teachers, students, and parents — all through a secure, role-based interface.

**Built for:** Allianz Tech Championship 2025 Ideathon

## ✨ Key Features

### 📊 Dashboard
- **Role-specific dashboards** for Admin, Teacher, Student, and Parent
- Real-time metrics and KPIs
- Performance charts and attendance trends
- Quick access to important information

### 👥 Student Management
- Comprehensive student database with personal details
- Add, edit, and delete student records
- Advanced search and filtering (by class, section, name, roll number)
- Attendance tracking integration
- Color-coded attendance percentage indicators

### 👨‍🏫 Teacher Management
- Teacher directory with subject assignments
- Contact information management
- Experience tracking
- Class assignment tracking

### 📅 Attendance System
- Class-wise attendance marking
- Real-time present/absent tracking
- Bulk mark all present/absent options
- Attendance percentage calculation
- Historical attendance records
- Visual attendance trends

### 📝 Exams & Marks
- Create and schedule exams
- Subject-wise exam management
- Enter and track student marks
- Exam calendar view
- Performance analytics

### 📢 Announcements
- Create and publish announcements
- Target specific audiences (Students/Teachers/Parents/All)
- Delete announcements
- Filter by audience
- Date tracking

### 📊 Reports & Analytics
- Custom report generation
- Multiple export formats (PDF, CSV, Excel)
- Attendance reports (daily, weekly, monthly)
- Performance reports
- Student and teacher directories
- Exam schedules
- Result cards

### 🤖 AI Chatbot
- Voice and text interaction
- Navigation assistance ("Go to students", "Go to attendance", etc.)
- School management queries
- Speech synthesis for responses
- Speech recognition for input

### 👤 Profile Management
- User profile editing
- Personal information management
- Security settings
- Password management
- Role-based access control

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Charts:** Recharts
- **AI:** Vercel AI SDK
- **Icons:** Lucide React
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/Jishnu0123/v0-school-management-system.git

# Navigate to project directory
cd v0-school-management-system

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
v0-school-management-system/
├── app/
│   ├── api/              # API routes
│   │   ├── chat/         # Chatbot API
│   │   ├── students/     # Student CRUD operations
│   │   ├── teachers/     # Teacher CRUD operations
│   │   ├── attendance/   # Attendance tracking
│   │   ├── exams/        # Exam management
│   │   └── announcements/# Announcement system
│   ├── dashboard/        # Dashboard pages
│   │   ├── students/     # Student management
│   │   ├── teachers/     # Teacher management
│   │   ├── attendance/   # Attendance marking
│   │   ├── exams/        # Exam & marks
│   │   ├── reports/      # Reports generation
│   │   ├── announcements/# Announcements
│   │   ├── chatbot/      # Chatbot page
│   │   └── profile/      # User profile
│   ├── login/            # Login page
│   ├── error.tsx         # Error boundary
│   ├── loading.tsx       # Loading state
│   └── not-found.tsx     # 404 page
├── components/
│   ├── ui/               # Reusable UI components
│   ├── charts/           # Chart components
│   ├── chatbot-widget.tsx# AI chatbot widget
│   └── sidebar.tsx       # Navigation sidebar
└── lib/                  # Utilities and context
```

## 🔑 API Endpoints

### Students
- `GET /api/students` - Fetch students (with filters)
- `POST /api/students` - Add new student
- `PUT /api/students` - Update student
- `DELETE /api/students?id={id}` - Delete student

### Teachers
- `GET /api/teachers` - Fetch teachers
- `POST /api/teachers` - Add new teacher
- `PUT /api/teachers` - Update teacher
- `DELETE /api/teachers?id={id}` - Delete teacher

### Attendance
- `GET /api/attendance` - Fetch attendance records
- `POST /api/attendance` - Mark attendance

### Exams
- `GET /api/exams?type=exams` - Fetch exams
- `GET /api/exams?type=marks&examId={id}` - Fetch marks
- `POST /api/exams` - Create exam or add marks

### Announcements
- `GET /api/announcements` - Fetch announcements
- `POST /api/announcements` - Create announcement
- `DELETE /api/announcements?id={id}` - Delete announcement

### Chatbot
- `POST /api/chat` - AI chat interaction

## 🎨 Features Breakdown

### Role-Based Access Control
- **Admin:** Full system access, manage all data
- **Teacher:** Manage assigned classes, attendance, marks
- **Student:** View personal data, attendance, marks (read-only)
- **Parent:** Monitor child's progress and communications

### Interactive Chatbot
- Voice commands for navigation
- Natural language processing
- Text-to-speech responses
- Speech recognition input

### Advanced Filtering & Search
- Multi-criteria filtering
- Real-time search
- Class and section filters
- Efficient data pagination

### Data Visualization
- Attendance trend charts
- Performance analytics
- Subject-wise comparisons
- Interactive graphs

## 📱 Responsive Design
- Mobile-friendly interface
- Tablet optimization
- Desktop-first layout
- Adaptive components

## 🔒 Security Features
- Role-based authentication
- Secure data handling
- Password protection
- Session management

## 🚧 Future Enhancements
- Real database integration (PostgreSQL/MongoDB)
- Email notification system
- SMS alerts for parents
- Biometric attendance
- Mobile app (React Native)
- Document upload system
- Fee management
- Timetable management
- Library management
- Transport management

## 📄 License
This project is part of the Allianz Tech Championship 2025 Ideathon.

## 🤝 Contributing
This is a prototype project. For suggestions or improvements, please open an issue.

## 🌐 Live Demo
**Production:** [https://vercel.com/jishnucs24-8713s-projects/v0-school-management-system](https://vercel.com/jishnucs24-8713s-projects/v0-school-management-system)

## 📧 Contact
For queries regarding this project, please reach out through the GitHub repository.

---

**Built with ❤️ for Government Schools**