# DiskarTech App - Complete Flow Chart

> **Note:** This document now includes the full feature specifications provided. The existing screens already built will be expanded to include these features step by step.

---

## 🧩 Student App Complete Feature Flow

## 📱 App Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         ROOT LAYOUT                              │
│                    (Stack Navigator)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────┐                                                │
│   │   index.tsx  │ ← Splash Screen (Animated Logo + Loading Bar) │
│   └──────┬──────┘                                                │
│          │ auto-redirect (3s)                                    │
│          ▼                                                       │
│   ┌─────────────┐                                                │
│   │  onboarding  │ ← 3 Slides (Find Jobs → Verified Employers → │
│   │   .tsx      │     Earn While You Learn)                      │
│   └──────┬──────┘                                                │
│          │ "Get Started" / "Skip"                                │
│          ▼                                                       │
│   ┌─────────────────────────────────────────────────────────────┐│
│   │                    AUTH FLOW                                 ││
│   │                                                              ││
│   │   ┌──────────────────────────────────────────────────────┐   ││
│   │   │                  Welcome Screen                        │   ││
│   │   │              (auth/welcome.tsx)                        │   ││
│   │   │                                                       │   ││
│   │   │   ┌─────────────────────┐  ┌───────────────────────┐  │   ││
│   │   │   │  Student Login      │  │  Employer Login        │  │   ││
│   │   │   │  → /auth/login      │  │  → /auth/login        │  │   ││
│   │   │   │  ?type=student      │  │  ?type=employer       │  │   ││
│   │   │   └──────────┬──────────┘  └───────────┬───────────┘  │   ││
│   │   │              │                         │              │   ││
│   │   │              └──────┬──────────────────┘              │   ││
│   │   │                     ▼                                 │   ││
│   │   │              ┌────────────────┐                       │   ││
│   │   │              │  Login Screen   │                       │   ││
│   │   │              │ (auth/login.tsx)│                       │   ││
│   │   │              │                 │                       │   ││
│   │   │              │ Email/Password  │                       │   ││
│   │   │              │ + Remember Me   │                       │   ││
│   │   │              │ + Google Login  │                       │   ││
│   │   │              └────────┬────────┘                       │   ││
│   │   │                       │                                │   ││
│   │   │        ┌──────────────┴──────────────┐                │   ││
│   │   │        ▼                              ▼                │   ││
│   │   │  ┌─────────────┐           ┌──────────────────┐       │   ││
│   │   │  │ Student Dash │           │ Employer Dashboard│      │   ││
│   │   │  │ /(tabs)/home │           │/employer-dashboard│      │   ││
│   │   │  └─────────────┘           └──────────────────┘       │   ││
│   │   └──────────────────────────────────────────────────────┘   ││
│   │                                                              ││
│   │   ┌──────────────────────────────────────────────────────┐   ││
│   │   │              REGISTRATION FLOW                        │   ││
│   │   │                                                       │   ││
│   │   │   ┌─────────────────────┐  ┌───────────────────────┐  │   ││
│   │   │   │ Register Student     │  │ Register Employer     │  │   ││
│   │   │   │ /auth/register-      │  │ /auth/register-       │  │   ││
│   │   │   │ student.tsx           │  │ employer.tsx          │  │   ││
│   │   │   │                       │  │                       │  │   ││
│   │   │   │ • Personal Info       │  │ • Business Info       │  │   ││
│   │   │   │ • School Info         │  │ • Documents Upload    │  │   ││
│   │   │   │ • Additional Info     │  │                       │  │   ││
│   │   │   │ • Document Upload     │  │                       │  │   ││
│   │   │   └──────────┬────────────┘  └───────────┬───────────┘  │   ││
│   │   │              │                            │              │   ││
│   │   │              ▼                            ▼              │   ││
│   │   │   ┌─────────────────────┐  ┌───────────────────────┐   │   ││
│   │   │   │ Student Dashboard    │  │ Employer Dashboard    │   │   ││
│   │   │   │ /(tabs)/home         │  │ /employer-dashboard   │   │   ││
│   │   │   └─────────────────────┘  └───────────────────────┘   │   ││
│   │   └──────────────────────────────────────────────────────┘   ││
│   └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│   ┌─────────────────────────────────────────────────────────────┐│
│   │              STUDENT TAB NAVIGATION                          ││
│   │              (/(tabs)/_layout.tsx)                          ││
│   │                                                              ││
│   │   ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌──────────┐   ││
│   │   │  HOME    │ │ SEARCH   │ │APPLICATIONS│ │ MESSAGES │   ││
│   │   │ tab 1    │ │ tab 2    │ │ tab 3      │ │ tab 4    │   ││
│   │   │          │ │          │ │            │ │          │   ││
│   │   │ • Jobs   │ │ • Search │ │ • Pending  │ │ • Chats  │   ││
│   │   │ • Cat.   │ │ • Filter │ │ • Accepted │ │ • Status │   ││
│   │   │ • Nearby │ │ • Nearby │ │ • Rejected │ │ • Online │   ││
│   │   └────┬─────┘ └────┬─────┘ └─────┬──────┘ └────┬─────┘   ││
│   │        │            │             │             │          ││
│   │        └────────────┴─────────────┴─────────────┘          ││
│   │                         │                                   ││
│   │                         ▼                                   ││
│   │              ┌─────────────────────┐                        ││
│   │              │    PROFILE (tab 5)   │                        ││
│   │              │   /(tabs)/profile    │                        ││
│   │              │                      │                        ││
│   │              │ • Personal Info      │                        ││
│   │              │ • Verification       │                        ││
│   │              │ • Settings → /settings│                       ││
│   │              │ • Skills             │                        ││
│   │              └─────────────────────┘                        ││
│   └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│   ┌─────────────────────────────────────────────────────────────┐│
│   │               COMMON SCREENS (Stack Screens)                ││
│   │                                                              ││
│   │   ┌────────────┐   ┌──────────┐   ┌───────────────┐        ││
│   │   │ Job Details │   │   Chat   │   │ Notifications  │        ││
│   │   │ /job-details│   │ /chat    │   │ /notifications │        ││
│   │   │             │   │          │   │                │        ││
│   │   │ • Info      │   │ • Msgs   │   │ • All notifs   │        ││
│   │   │ • Req       │   │ • Send   │   │ • Job alerts   │        ││
│   │   │ • Apply     │   │ • Status │   │ • Status upd   │        ││
│   │   └────────────┘   └──────────┘   └───────────────┘        ││
│   │                                                              ││
│   │   ┌──────────────┐  ┌───────────┐  ┌──────────────────┐    ││
│   │   │ Job Posting   │  │Applicant  │  │ Verification     │    ││
│   │   │(Employer Only)│  │ Details   │  │ Status           │    ││
│   │   │ /job-posting  │  │/applicant-│  │ /verification-   │    ││
│   │   │               │  │ details   │  │ status           │    ││
│   │   │ • Create Job  │  │ • Profile │  │ • Progress Bar   │    ││
│   │   │ • Form Fields │  │ • Docs    │  │ • Documents      │    ││
│   │   │ • Post        │  │ • Actions │  │ • Upload Again   │    ││
│   │   └──────────────┘  └───────────┘  └──────────────────┘    ││
│   └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔀 Complete Navigation Routes

### Public / Auth Routes
| Route | Screen | Description |
|-------|--------|-------------|
| `/` | `index.tsx` | Splash screen with animated logo |
| `/onboarding` | `onboarding.tsx` | 3-slide introduction carousel |
| `/auth/welcome` | `welcome.tsx` | Welcome page with Student/Employer login buttons |
| `/auth/login` | `login.tsx` | Login form (reads `?type=student` or `?type=employer`) |
| `/auth/register-student` | `register-student.tsx` | Student registration (Personal → School → Documents) |
| `/auth/register-employer` | `register-employer.tsx` | Employer registration (Business → Documents) |

### Student Tab Routes (Bottom Tabs)
| Route | Screen | Description |
|-------|--------|-------------|
| `/(tabs)/home` | `home.tsx` | Dashboard with jobs, categories, recommendations |
| `/(tabs)/search` | `search.tsx` | Job search with filters |
| `/(tabs)/applications` | `applications.tsx` | Application status list |
| `/(tabs)/messages` | `messages.tsx` | Chat conversations list |
| `/(tabs)/profile` | `profile.tsx` | User profile & settings |

### Stack Screens (Accessible from multiple tabs)
| Route | Screen | Description |
|-------|--------|-------------|
| `/job-details` | `job-details.tsx` | Full job details with apply button |
| `/chat` | `chat.tsx` | Individual chat thread |
| `/notifications` | `notifications.tsx` | All notifications |
| `/settings` | `settings.tsx` | App settings |
| `/modal` | `modal.tsx` | Generic modal screen |

### Employer Screens (Standalone)
| Route | Screen | Description |
|-------|--------|-------------|
| `/employer-dashboard` | `employer-dashboard.tsx` | Employer dashboard (stats, applications, jobs) |
| `/job-posting` | `job-posting.tsx` | Create & post new job |
| `/applicant-details` | `applicant-details.tsx` | View applicant profile |
| `/verification-status` | `verification-status.tsx` | Document verification progress |

---

## 👥 User Role Flow

```
                    ┌──────────────────────────┐
                    │     WELCOME SCREEN        │
                    └──────┬───────────┬────────┘
                           │           │
                    ┌──────┘           └──────┐
                    ▼                         ▼
            ┌─────────────────┐    ┌──────────────────────┐
            │  STUDENT LOGIN   │    │   EMPLOYER LOGIN     │
            │  ?type=student   │    │   ?type=employer     │
            └────────┬────────┘    └───────────┬──────────┘
                     │                         │
                     ▼                         ▼
            ┌──────────────────────┐  ┌──────────────────────┐
            │   STUDENT DASHBOARD   │  │  EMPLOYER DASHBOARD │
            │                      │  │                      │
            │ • Browse Jobs        │  │ • View Stats         │
            │ • Search & Filter    │  │ • Post Jobs          │
            │ • Track Applications │  │ • Review Applicants  │
            │ • Chat with Employers│  │ • Chat with Students │
            │ • Manage Profile     │  │ • Manage Listings    │
            └──────────────────────┘  └──────────────────────┘
```

---

## 📂 File Structure

```
app/
├── _layout.tsx              # Root Stack Navigator
├── index.tsx                # Splash Screen
├── onboarding.tsx           # Onboarding Carousel
├── modal.tsx                # Generic Modal
├── notifications.tsx        # Notifications Screen
├── settings.tsx             # Settings Screen
├── employer-dashboard.tsx   # Employer Dashboard (Standalone)
├── job-posting.tsx          # Create Job Posting
├── applicant-details.tsx    # Applicant Profile View
├── verification-status.tsx  # Verification Progress
├── chat.tsx                 # Chat Thread
├── job-details.tsx          # Job Details
│
├── auth/
│   ├── welcome.tsx          # Welcome Page
│   ├── login.tsx            # Login Form
│   ├── register-student.tsx # Student Registration
│   └── register-employer.tsx# Employer Registration
│
└── (tabs)/
    ├── _layout.tsx          # Tab Navigator Layout
    ├── home.tsx             # Student Dashboard (Home Tab)
    ├── search.tsx           # Job Search Tab
    ├── applications.tsx     # Applications Tab
    ├── messages.tsx         # Messages Tab
    └── profile.tsx          # Profile Tab
```

---

## 🧭 Navigation Flow Diagram

```
START
  │
  ▼
Splash Screen (index.tsx)
  │ (3s auto)
  ▼
Onboarding (onboarding.tsx) ──[Skip]──┐
  │ [Get Started]                      │
  ▼                                    │
Welcome Screen (welcome.tsx)           │
  │                                    │
  ├──[Student Login]──▼                │
  │                  Login             │
  ├──[Employer Login]─┘ (login.tsx)    │
  │                  │                 │
  │     ┌────────────┼────────────┐    │
  │     │ type=student│type=employer│   │
  │     ▼             ▼            │    │
  │  Student       Employer        │    │
  │  Dashboard     Dashboard       │    │
  │  /(tabs)/home  /employer-      │    │
  │                dashboard       │    │
  │                                │    │
  └──[Register]────────────────────┘    │
         │                              │
         ├──[Student Register]──► Student Dashboard
         └──[Employer Register]─► Employer Dashboard
```

---

## 🔄 Screen Transitions

| Transition | From | To | Animation |
|-----------|------|----|-----------|
| Splash → Onboarding | index | onboarding | Fade |
| Onboarding → Welcome | onboarding | auth/welcome | Fade |
| Welcome → Login | auth/welcome | auth/login | Slide from right |
| Welcome → Student Register | auth/welcome | auth/register-student | Slide from right |
| Login → Student Dashboard | auth/login | (tabs)/home | Replace (no back) |
| Login → Employer Dashboard | auth/login | employer-dashboard | Replace (no back) |
| Register → Dashboard | auth/register-* | home/employer-dashboard | Replace (no back) |
| Tab switching | Any tab | Other tab | None (instant) |
| Push screen | Any | job-details/chat/etc | Slide from right |
| Modal | Any | modal | Modal presentation |
| Back | Any | Previous | Slide from left |

---

## 📋 Student App Complete Feature Specifications

### 🏠 Home
```
Home
 │
 ├── Recommended Jobs (AI)
 ├── Nearby Jobs
 ├── Recent Jobs
 ├── Emergency Jobs
 ├── Latest Hiring
 ├── Notifications
 └── Search
```

### 👤 Student Profile
```
Profile
 │
 ├── Personal Information
 ├── School Information
 ├── Resume
 ├── Skills
 ├── Certificates
 ├── Experience
 ├── Portfolio
 ├── Schedule Availability
 ├── Preferred Salary
 ├── Preferred Job
 ├── Preferred Distance
 ├── Motivation Tracker
 ├── Rating
 ├── Completed Jobs
 └── Edit Profile
```

### ✅ Verification
```
Verification
 │
 ├── Government ID
 ├── School ID
 ├── Certificate of Enrollment
 ├── Selfie Verification
 └── Waiting Approval
```

### 🔍 Search Job
```
Search Job
 │
 ├── Search Bar
 ├── Category
 ├── Salary Filter
 ├── Distance Filter
 ├── Schedule Filter
 ├── Employer Rating
 ├── Verified Employer Only
 ├── Full Time
 ├── Part Time
 ├── Seasonal
 ├── One Day Job
 └── Emergency Job
```

### 📄 Job Details
```
Job Details
 │
 ├── Employer Information
 ├── Salary
 ├── Schedule
 ├── Requirements
 ├── Distance
 ├── Location Map
 ├── Employer Rating
 ├── Reviews
 ├── Save Job
 ├── Share
 └── Apply
```

### 📝 Apply Job
```
Apply
 │
 ├── Resume
 ├── Cover Letter
 ├── Availability
 ├── Confirm
 └── Submit
```

### 📊 Application Tracking
```
Applications
 │
 ├── Pending
 ├── Viewed
 ├── Shortlisted
 ├── Interview
 ├── Accepted
 ├── Rejected
 ├── Completed
 └── Cancelled
```

### 💬 Chat
```
Messages
 │
 ├── Employer Chat
 ├── Send Images
 ├── Resume
 ├── Location
 ├── Voice
 └── Report User
```

### 🔔 Smart Alerts
```
Notifications
 │
 ├── New Job Nearby
 ├── Interview
 ├── Accepted
 ├── Rejected
 ├── Verification
 ├── Chat
 └── Reminder
```

### 📅 Schedule
```
Schedule
 │
 ├── Monday
 ├── Tuesday
 ├── Wednesday
 ├── Thursday
 ├── Friday
 ├── Saturday
 ├── Sunday
 │
 ▼
AI Conflict Detection
 │
 ├── Conflict?
 │
 ├── Yes
 │      │
 │      ▼
 │ Block Job
 │
 └── No
 │
 ▼
Accept Job
```

### 💰 Earnings
```
My Earnings
 │
 ├── Completed Jobs
 ├── Total Earnings
 ├── Pending Payment
 ├── Expense Goal
 └── Progress Tracker
```

### ⭐ Ratings
```
Rate Employer
 │
 ├── 1-5 Stars
 ├── Comment
 └── Submit
```

### 🚨 Report
```
Report Employer
 │
 ├── Scam
 ├── Abuse
 ├── Fake Job
 ├── Unsafe
 └── Submit Evidence
```

---

## 🆕 New Screens / Features Needed

Based on the complete flow above, here are the new screens and features that need to be developed:

| # | Screen/Feature | Route | Description | Status |
|---|---------------|-------|-------------|--------|
| 1 | **Schedule** | `/schedule` | Weekly schedule with day-by-day job slots + AI conflict detection | ❌ Not yet built |
| 2 | **Apply Job** | `/apply-job` | Resume, cover letter, availability, confirm & submit | ❌ Not yet built |
| 3 | **Earnings** | `/earnings` | Completed jobs, total earnings, pending payment, expense goal, progress tracker | ❌ Not yet built |
| 4 | **Rate Employer** | `/rate-employer` | 1-5 star rating with comment & submit | ❌ Not yet built |
| 5 | **Report Employer** | `/report-employer` | Report reasons (scam, abuse, fake job, unsafe) + evidence upload | ❌ Not yet built |
| 6 | **Emergency Jobs** | (section in Home) | Urgent hiring jobs section | ❌ Not yet built |
| 7 | **Profile Enhancements** | `/profile` | Resume, Certificates, Experience, Portfolio, Schedule Availability, Preferred Salary/Job/Distance, Motivation Tracker, Rating, Completed Jobs | ❌ Need expansion |
| 8 | **Verification Enhancements** | `/verification-status` | Add Certificate of Enrollment upload + Selfie Verification | ❌ Need expansion |
| 9 | **Search Enhancements** | `/search` | Add filters: Employer Rating, Verified Only, Seasonal, One Day Job, Emergency Job | ❌ Need expansion |
| 10 | **Application Tracking Enhancements** | `/applications` | Add statuses: Viewed, Shortlisted, Interview | ❌ Need expansion |
| 11 | **Job Details Enhancement** | `/job-details` | Add Location Map, Employer Rating, Reviews, Save/Share | ❌ Need expansion |
| 12 | **Chat Enhancements** | `/chat` | Add Image/Location/Voice/Resume sending + Report User | ❌ Need expansion |
| 13 | **Notifications Enhancements** | `/notifications` | Add: New Job Nearby, Interview, Reminder | ❌ Need expansion |
