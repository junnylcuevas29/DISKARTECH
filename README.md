# DiskarTech 🎓💼

**Smart Jobs for Smart Students.**

DiskarTech is a mobile-based job matching platform that connects working students with verified local employers offering part-time, flexible, and student-friendly jobs.

> ⚠️ **Frontend Only** — This project contains only the UI. No backend, database, Firebase, authentication logic, or API calls. All data is realistic mock data, ready for future backend integration.

---

## ✨ Features

- 🚀 **Splash Screen** — Animated gradient intro with the DiskarTech logo
- 👋 **Onboarding** — 3 beautiful intro screens
- 🔐 **Authentication UI** — Welcome, Login, Student Registration, Employer Registration
- 🏠 **Home** — Greeting, search bar, categories, nearby/featured/recommended/recent jobs
- 🔍 **Search** — Filterable job search with categories, salary, distance & schedule filters
- 📄 **Applications** — Track application status (Pending / Accepted / Rejected / Completed)
- 📁 **Job Details** — Full job banner, description, requirements, skills, benefits & employer info
- 💬 **Messages** — Conversation list with unread badges & online indicators + full chat UI
- 👤 **Profile** — Student profile with verification badge, school info, skills & resume
- 🔔 **Notifications** — Job recommendations, application updates, interview reminders
- 🏢 **Employer Dashboard** — Stats, posted jobs, applicants, quick post-job button
- 📝 **Job Posting** — Post new jobs with title, description, salary, schedule & requirements
- 🕵️ **Applicant Details** — Review applicants, accept/reject/message
- ✅ **Verification Status** — Pending / Verified / Rejected states with progress indicator

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Primary** | Crimson Red `#D32F2F` |
| **Secondary** | White `#FFFFFF` |
| **Accent** | Black `#121212` |
| **Background** | Light Gray `#F8F8F8` |

Premium, modern design inspired by Airbnb, LinkedIn, Grab, Indeed & JobStreet — with rounded corners, glassmorphism, soft shadows, smooth gradients, and consistent spacing.

## 🧱 Tech Stack

- **React Native** (Expo SDK 54)
- **Expo Router** (file-based navigation)
- **Expo Vector Icons**
- **NativeWind** (Tailwind CSS for React Native)
- **React Native Reanimated** (animations)
- **JavaScript** (no TypeScript in app code)

## 🗂️ Project Structure

```
DiskarTech/
├── app/                    # Screens (file-based routing)
│   ├── index.tsx           # Splash screen
│   ├── onboarding.tsx      # Onboarding slides
│   ├── modal.tsx           # Generic modal
│   ├── auth/               # Welcome / Login / Registration
│   ├── student/            # 👨🎓 All student screens
│   │   ├── (tabs)/         # Home / Search / Applications / Messages / Profile
│   │   └── ...             # job-details, apply-job, schedule, earnings, reviews, verification
│   ├── employer/           # 🏢 All employer screens
│   │   └── ...             # dashboard, job-posting, applicant-details
│   └── common/             # 🔗 Shared screens
│       └── ...             # chat, notifications, settings
├── components/
│   └── ui/                 # Reusable components (buttons, cards, inputs, badges...)
├── constants/              # Colors & typography tokens
├── data/                   # Mock JSON data (jobs, messages, applications...)
├── types/                  # Shared interfaces
└── utils/                  # Helper functions
```

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

3. Scan the QR code with **Expo Go** (Android/iOS) or press `a` for the Android emulator.

## 📱 Run on Android

```bash
npm run android
```

## 🧪 Lint

```bash
npm run lint
```

---

Built with ❤️ for working students.

