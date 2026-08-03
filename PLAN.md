# Student Dashboard & Profile Enhancement Plan

## Information Gathered
- The app uses **Expo Router** with a `Stack` navigator (`app/_layout.tsx`) and a student `(tabs)` navigator (`app/student/(tabs)/_layout.tsx`) with 5 tabs: home, search, applications, messages, profile.
- Current student dashboard (`app/student/(tabs)/home.tsx`) shows greeting, search, categories, featured/nearby/recommended/recent jobs.
- Current profile (`app/student/(tabs)/profile.tsx`) shows a static card + menu items (Settings, Help Center, About, Logout) at the bottom.
- Registration form (`app/auth/register-student.tsx`) collects: firstName, middleName, lastName, birthday, gender, mobile, email, schoolName, schoolType, course/strand, yearLevel, studentNumber, schedule, skills, jobTypes, locations, documents.
- Reusable UI components exist: `Avatar`, `Badge`, `Chip`, `GlassCard`, `PrimaryButton`, `InputField`, `SearchBar`, `JobCard`, `CategoryCard`, `EmptyState`.
- Design tokens in `constants/colors.ts` (primary `#D32F2F`) and `constants/typography.ts`.

## Plan

### 1. Create registration-matching student data (`data/studentProfile.ts`)
- A `StudentProfile` object mirroring the registration form fields, so the profile shows exactly what was entered.
- Add a `StudentProfileData` type + a `registerStudentData` export.

### 2. Redesign Student Dashboard (`app/student/(tabs)/home.tsx`)
- Add a **burger icon (menu) on the left side** of the greeting header.
- Add a **Profile Completion** card (Progress ring/bar, 85%, with "+10% Upload Resume", "+5% Add Skills" action chips).
- Add **AI Job Recommendation** section (Recommended Jobs with match score).
- Add **Smart Alerts** section (e.g. "New Job Available · 2km away · Matches your schedule").
- Add **Expense Motivation Tracker** card (Goal: Tuition Fee ₱10,000, Saved ₱3,000, Progress 30%).
- Keep existing Categories / Featured / Nearby / Recommended / Recent job sections.

### 3. Create a reusable Burger/Drawer Menu (`components/ui/BurgerMenu.tsx`)
- A left-side slide-in drawer (overlay + panel) that contains: **Settings, About DiskarTech, Help Center, Logout**.
- Opens when the burger icon is pressed; closes on backdrop tap / close button.

### 4. Redesign Profile (`app/student/(tabs)/profile.tsx`)
- Show **all registration info** (personal, school, skills, job preferences, locations, schedule).
- Add an **Edit Profile** button that opens the edit screen.
- **Remove** the Settings/Help/About/Logout menu from the bottom (moved to the burger drawer).
- Add the burger icon to the profile header too.

### 5. Create Edit Profile screen (`app/student/edit-profile.tsx`)
- Editable form fields matching the registration data (name, mobile, email, school, course, year level, skills, job types, locations, availability).
- Save button that updates the profile data (via a shared state/store).

### 6. Register the new routes in `app/_layout.tsx`
- Add `student/edit-profile` stack screen.

## Dependent Files to be Edited
- `app/student/(tabs)/home.tsx` (redesign dashboard)
- `app/student/(tabs)/profile.tsx` (redesign profile + burger menu)
- `app/_layout.tsx` (register edit-profile route)
- `components/ui/BurgerMenu.tsx` (new component)
- `data/studentProfile.ts` (new data source)
- `app/student/edit-profile.tsx` (new screen)

## Followup Steps
- Run `npx expo start` to verify no import/type errors.
- Verify the dashboard, profile, and burger menu render correctly.
