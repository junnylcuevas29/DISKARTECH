import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// ---------- Data options ----------
const GENDERS = ['Female', 'Male', 'Prefer not to say'];
const SCHOOL_TYPES = ['College', 'SHS'];
const COLLEGE_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year+'];
const SHS_YEARS = ['Grade 11', 'Grade 12'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SKILLS = [
  'Cooking',
  'Tutoring',
  'Graphic Design',
  'Data Entry',
  'Delivery Assistance',
  'Cleaning',
  'Sales Assistance',
  'Event Staff',
  'Social Media Management',
  'Computer Repair',
  'Photography',
  'Customer Service',
];
const JOB_TYPES = ['Part-Time', 'Temporary', 'Seasonal', 'Freelance', 'Weekend Job', 'After-Class Job'];
const LOCATIONS = ['Barangay', 'Pinamalayan Area', '3-5 KM Radius'];

const STEP_LABELS = ['Personal Info', 'School', 'Skills & Job', 'Documents', 'Review'];

// ---------- Helper: compute age from birthday ----------
function computeAge(birthday: string): number | null {
  if (!birthday) return null;
  const parts = birthday.split('/');
  if (parts.length !== 3) return null;
  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (!month || !day || !year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const birth = new Date(year, month - 1, day);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age >= 0 && age < 120 ? age : null;
}

export default function RegisterStudentScreen() {
  const [step, setStep] = useState(0);

  // Step 1 - Personal
  const [profilePicture, setProfilePicture] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2 - School
  const [schoolName, setSchoolName] = useState('');
  const [schoolType, setSchoolType] = useState('College');
  const [course, setCourse] = useState('');
  const [strand, setStrand] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [schedule, setSchedule] = useState<Record<string, { class: string; avail: string }>>({});

  // Step 3 - Skills & Job
  const [skills, setSkills] = useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  // Step 4 - Documents
  const [documents, setDocuments] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const age = useMemo(() => computeAge(birthday), [birthday]);

  const toggleSelection = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const setScheduleFor = (day: string, field: 'class' | 'avail', value: string) => {
    setSchedule((prev) => ({ ...prev, [day]: { ...(prev[day] || { class: '', avail: '' }), [field]: value } }));
  };

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!firstName.trim()) e.firstName = 'First name is required';
      if (!lastName.trim()) e.lastName = 'Last name is required';
      if (!birthday.trim()) e.birthday = 'Birthday is required';
      else if (age === null) e.birthday = 'Enter a valid MM/DD/YYYY date';
      if (!gender) e.gender = 'Please select a gender';
      if (!mobile.trim()) e.mobile = 'Mobile number is required';
      if (!email.trim()) e.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email';
      if (!password) e.password = 'Password is required';
      else if (password.length < 6) e.password = 'Password must be at least 6 characters';
      if (!confirmPassword) e.confirmPassword = 'Please confirm your password';
      else if (confirmPassword !== password) e.confirmPassword = 'Passwords do not match';
    }
    if (s === 1) {
      if (!schoolName.trim()) e.schoolName = 'School name is required';
      if (schoolType === 'College' && !course.trim()) e.course = 'Course is required';
      if (schoolType === 'SHS' && !strand.trim()) e.strand = 'Strand is required';
      if (!yearLevel) e.yearLevel = 'Select your year level';
      if (!studentNumber.trim()) e.studentNumber = 'Student number is required';
    }
    if (s === 2) {
      if (skills.length === 0) e.skills = 'Select at least one skill';
      if (jobTypes.length === 0) e.jobTypes = 'Select at least one job type';
      if (locations.length === 0) e.locations = 'Select at least one preferred location';
    }
    if (s === 3) {
      const required = ['School ID', 'Government ID', 'Certificate of Enrollment', 'Resume'];
      const missing = required.filter((r) => !documents.includes(r));
      if (missing.length > 0) e.documents = `Please upload: ${missing.join(', ')}`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 4));
    }
  };

  const back = () => {
    if (step === 0) router.back();
    else setStep((s) => s - 1);
  };

  const submit = () => {
    Alert.alert('Application Submitted 🎉', 'Your student account has been created and is pending verification.', [
      { text: 'OK', onPress: () => router.replace('/student/verification-status') },
    ]);
  };

  const chosenYearOptions = schoolType === 'College' ? COLLEGE_YEARS : SHS_YEARS;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Back button */}
          <TouchableOpacity onPress={back} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity style={styles.activeTab}>
              <MaterialIcons name="school" size={20} color={Colors.white} />
              <Text style={styles.activeTabText}>Student</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inactiveTab}
              onPress={() => router.push('/auth/register-employer')}
            >
              <MaterialIcons name="business" size={20} color={Colors.textSecondary} />
              <Text style={styles.inactiveTabText}>Employer</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Create Student Account</Text>
          <Text style={styles.subtitle}>Step {step + 1} of 5</Text>

          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${((step + 1) / 5) * 100}%` }]} />
          </View>

          {/* Step indicators */}
          <View style={styles.stepRow}>
            {STEP_LABELS.map((label, i) => (
              <View key={label} style={styles.stepItem}>
                <View style={[styles.stepDot, i <= step ? styles.stepDotActive : styles.stepDotInactive]}>
                  {i < step ? (
                    <MaterialIcons name="check" size={14} color={Colors.white} />
                  ) : (
                    <Text style={[styles.stepNum, i <= step && styles.stepNumActive]}>{i + 1}</Text>
                  )}
                </View>
                <Text style={[styles.stepLabel, i <= step && styles.stepLabelActive]} numberOfLines={1}>
                  {label}
                </Text>
              </View>
            ))}
          </View>

          {/* ============ STEP 1: PERSONAL ============ */}
          {step === 0 && (
            <View>
              <Text style={styles.sectionTitle}>Personal Information</Text>

              {/* Profile picture */}
              <TouchableOpacity style={styles.avatarWrap} onPress={() => setProfilePicture(!profilePicture)}>
                <View style={styles.avatar}>
                  {profilePicture ? (
                    <MaterialIcons name="person" size={40} color={Colors.white} />
                  ) : (
                    <MaterialIcons name="add-a-photo" size={28} color={Colors.primary} />
                  )}
                </View>
                <Text style={styles.avatarHint}>
                  {profilePicture ? 'Photo Selected (tap to change)' : 'Add Profile Picture (optional)'}
                </Text>
              </TouchableOpacity>

              <InputField label="First Name" placeholder="Enter your first name" icon="person" value={firstName} onChangeText={setFirstName} error={errors.firstName} />
              <InputField label="Middle Name" placeholder="Enter your middle name (optional)" icon="person-outline" value={middleName} onChangeText={setMiddleName} />
              <InputField label="Last Name" placeholder="Enter your last name" icon="person" value={lastName} onChangeText={setLastName} error={errors.lastName} />

              <View style={styles.row}>
                <View style={styles.rowHalf}>
                  <InputField label="Birthday" placeholder="MM/DD/YYYY" icon="cake" value={birthday} onChangeText={setBirthday} keyboardType="numbers-and-punctuation" error={errors.birthday} />
                </View>
                <View style={styles.rowHalf}>
                  <InputField label="Age" value={age !== null ? String(age) : ''} editable={false} icon="tag" />
                </View>
              </View>

              <Text style={styles.fieldLabel}>Gender</Text>
              <View style={styles.chipWrap}>
                {GENDERS.map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.chip, gender === g && styles.chipSelected]}
                    onPress={() => setGender(g)}
                  >
                    <Text style={[styles.chipText, gender === g && styles.chipTextSelected]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

              <InputField label="Mobile Number" placeholder="e.g. 0917 123 4567" icon="phone" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} error={errors.mobile} />
              <InputField label="Email Address" placeholder="Enter your email" icon="email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} error={errors.email} />
              <InputField label="Password" placeholder="Create a password" isPassword icon="lock" value={password} onChangeText={setPassword} error={errors.password} />
              <InputField label="Confirm Password" placeholder="Confirm your password" isPassword icon="lock" value={confirmPassword} onChangeText={setConfirmPassword} error={errors.confirmPassword} />
            </View>
          )}

          {/* ============ STEP 2: SCHOOL ============ */}
          {step === 1 && (
            <View>
              <Text style={styles.sectionTitle}>School Information</Text>

              <InputField label="School Name" placeholder="Enter your school name" icon="school" value={schoolName} onChangeText={setSchoolName} error={errors.schoolName} />

              <Text style={styles.fieldLabel}>School Type</Text>
              <View style={styles.chipWrap}>
                {SCHOOL_TYPES.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.chip, schoolType === t && styles.chipSelected]}
                    onPress={() => {
                      setSchoolType(t);
                      setYearLevel('');
                    }}
                  >
                    <Text style={[styles.chipText, schoolType === t && styles.chipTextSelected]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {schoolType === 'College' ? (
                <InputField label="Course" placeholder="e.g. BS Information Technology" icon="menu-book" value={course} onChangeText={setCourse} error={errors.course} />
              ) : (
                <InputField label="Strand" placeholder="e.g. STEM, ABM, HUMSS" icon="school" value={strand} onChangeText={setStrand} error={errors.strand} />
              )}

              <Text style={styles.fieldLabel}>Year Level</Text>
              <View style={styles.chipWrap}>
                {chosenYearOptions.map((y) => (
                  <TouchableOpacity
                    key={y}
                    style={[styles.chip, yearLevel === y && styles.chipSelected]}
                    onPress={() => setYearLevel(y)}
                  >
                    <Text style={[styles.chipText, yearLevel === y && styles.chipTextSelected]}>{y}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.yearLevel && <Text style={styles.errorText}>{errors.yearLevel}</Text>}

              <InputField label="Student Number" placeholder="Enter your student number" icon="badge" value={studentNumber} onChangeText={setStudentNumber} error={errors.studentNumber} />

              <Text style={styles.sectionTitle}>Class Schedule & Availability</Text>
              <Text style={styles.scheduleHint}>Para malaman ng system ang availability mo.</Text>
              {DAYS.map((day) => (
                <View key={day} style={styles.dayCard}>
                  <Text style={styles.dayLabel}>{day}</Text>
                  <InputField
                    label="Class Time"
                    placeholder="e.g. 8:00 AM - 5:00 PM"
                    icon="menu-book"
                    value={schedule[day]?.class || ''}
                    onChangeText={(v) => setScheduleFor(day, 'class', v)}
                  />
                  <InputField
                    label="Available"
                    placeholder="e.g. 6PM - 10PM"
                    icon="schedule"
                    value={schedule[day]?.avail || ''}
                    onChangeText={(v) => setScheduleFor(day, 'avail', v)}
                  />
                </View>
              ))}
            </View>
          )}

          {/* ============ STEP 3: SKILLS & JOB ============ */}
          {step === 2 && (
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.scheduleHint}>Select all that apply.</Text>
              <View style={styles.chipWrap}>
                {SKILLS.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.chip, skills.includes(s) && styles.chipSelected]}
                    onPress={() => setSkills(toggleSelection(skills, s))}
                  >
                    <Text style={[styles.chipText, skills.includes(s) && styles.chipTextSelected]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.skills && <Text style={styles.errorText}>{errors.skills}</Text>}

              <Text style={styles.sectionTitle}>Preferred Job Type</Text>
              <View style={styles.chipWrap}>
                {JOB_TYPES.map((j) => (
                  <TouchableOpacity
                    key={j}
                    style={[styles.chip, jobTypes.includes(j) && styles.chipSelected]}
                    onPress={() => setJobTypes(toggleSelection(jobTypes, j))}
                  >
                    <Text style={[styles.chipText, jobTypes.includes(j) && styles.chipTextSelected]}>{j}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.jobTypes && <Text style={styles.errorText}>{errors.jobTypes}</Text>}

              <Text style={styles.sectionTitle}>Preferred Location</Text>
              <View style={styles.chipWrap}>
                {LOCATIONS.map((l) => (
                  <TouchableOpacity
                    key={l}
                    style={[styles.chip, locations.includes(l) && styles.chipSelected]}
                    onPress={() => setLocations(toggleSelection(locations, l))}
                  >
                    <Text style={[styles.chipText, locations.includes(l) && styles.chipTextSelected]}>{l}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.locations && <Text style={styles.errorText}>{errors.locations}</Text>}
            </View>
          )}

          {/* ============ STEP 4: DOCUMENTS ============ */}
          {step === 3 && (
            <View>
              <Text style={styles.sectionTitle}>Upload Requirements</Text>
              <Text style={styles.scheduleHint}>Student Verification requires these documents.</Text>

              <Text style={styles.fieldLabel}>Required</Text>
              {['School ID', 'Government ID', 'Certificate of Enrollment', 'Resume'].map((d) => (
                <UploadCard
                  key={d}
                  icon="description"
                  label={d}
                  uploaded={documents.includes(d)}
                  onPress={() =>
                    setDocuments((prev) =>
                      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                    )
                  }
                />
              ))}

              <Text style={[styles.fieldLabel, { marginTop: Spacing.md }]}>Optional</Text>
              {['Portfolio', 'Certificate', 'Previous Work Experience'].map((d) => (
                <UploadCard
                  key={d}
                  icon="folder"
                  label={d}
                  optional
                  uploaded={documents.includes(d)}
                  onPress={() =>
                    setDocuments((prev) =>
                      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                    )
                  }
                />
              ))}
              {errors.documents && <Text style={styles.errorText}>{errors.documents}</Text>}
            </View>
          )}

          {/* ============ STEP 5: REVIEW ============ */}
          {step === 4 && (
            <View>
              <Text style={styles.sectionTitle}>Review Account</Text>

              <ReviewSection title="Personal Information" icon="person">
                <ReviewRow label="Full Name" value={`${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`} />
                <ReviewRow label="Birthday" value={birthday} />
                <ReviewRow label="Age" value={age !== null ? String(age) : ''} />
                <ReviewRow label="Gender" value={gender} />
                <ReviewRow label="Mobile" value={mobile} />
                <ReviewRow label="Email" value={email} />
              </ReviewSection>

              <ReviewSection title="School Information" icon="school">
                <ReviewRow label="School" value={schoolName} />
                <ReviewRow label="Type" value={schoolType} />
                <ReviewRow label={schoolType === 'College' ? 'Course' : 'Strand'} value={schoolType === 'College' ? course : strand} />
                <ReviewRow label="Year Level" value={yearLevel} />
                <ReviewRow label="Student Number" value={studentNumber} />
              </ReviewSection>

              <ReviewSection title="Skills" icon="handyman">
                <ReviewRow label="Skills" value={skills.join(', ') || '—'} />
                <ReviewRow label="Job Type" value={jobTypes.join(', ') || '—'} />
                <ReviewRow label="Location" value={locations.join(', ') || '—'} />
              </ReviewSection>

              <ReviewSection title="Documents" icon="folder">
                <ReviewRow label="Uploaded" value={documents.join(', ') || '—'} />
              </ReviewSection>
            </View>
          )}

          {/* Navigation buttons */}
          <View style={styles.navRow}>
            {step < 4 ? (
              <PrimaryButton
                title="Continue"
                size="medium"
                onPress={next}
                icon={<MaterialIcons name="arrow-forward" size={18} color={Colors.white} />}
              />
            ) : (
              <PrimaryButton
                title="Submit Application"
                size="medium"
                onPress={submit}
                icon={<MaterialIcons name="check" size={18} color={Colors.white} />}
              />
            )}
            <PrimaryButton
              title="Back"
              variant="outline"
              size="medium"
              onPress={back}
            />
          </View>

          <Text style={styles.loginLink}>
            Already have an account?{' '}
            <Text style={styles.loginLinkText} onPress={() => router.push('/auth/login')}>
              Login
            </Text>
          </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// ---------- Reusable: UploadCard ----------
function UploadCard({
  icon,
  label,
  uploaded,
  optional = false,
  onPress,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  uploaded: boolean;
  optional?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.uploadCard, uploaded && styles.uploadCardDone]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.uploadIcon, uploaded && styles.uploadIconDone]}>
        <MaterialIcons name={uploaded ? 'check' : icon} size={24} color={uploaded ? Colors.white : Colors.primary} />
      </View>
      <View style={styles.uploadText}>
        <Text style={styles.uploadLabel}>{label}</Text>
        <Text style={styles.uploadHint}>
          {optional ? 'Optional' : 'Required'} · PDF, JPG or PNG (Max 5MB)
        </Text>
      </View>
      <MaterialIcons name={uploaded ? 'check-circle' : 'cloud-upload'} size={24} color={uploaded ? Colors.success : Colors.primary} />
    </TouchableOpacity>
  );
}

// ---------- Reusable: Review section ----------
function ReviewSection({ title, icon, children }: { title: string; icon: keyof typeof MaterialIcons.glyphMap; children: React.ReactNode }) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <MaterialIcons name={icon} size={20} color={Colors.primary} />
        <Text style={styles.reviewTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.reviewRow}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollView: { flex: 1 },
  content: { padding: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.xxxl },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.gray100,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg,
  },
  tabs: {
    flexDirection: 'row', backgroundColor: Colors.gray100, borderRadius: BorderRadius.lg,
    padding: 4, marginBottom: Spacing.xl,
  },
  activeTab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 12,
  },
  activeTabText: { ...Typography.buttonSmall, color: Colors.white },
  inactiveTab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: 12,
  },
  inactiveTabText: { ...Typography.buttonSmall, color: Colors.textSecondary },
  title: { ...Typography.h3, color: Colors.text, marginBottom: Spacing.xs },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.md },

  progressTrack: {
    height: 6, borderRadius: 3, backgroundColor: Colors.gray100, overflow: 'hidden', marginBottom: Spacing.md,
  },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  stepRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.lg },
  stepItem: { alignItems: 'center', flex: 1 },
  stepDot: {
    width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  stepDotActive: { backgroundColor: Colors.primary },
  stepDotInactive: { backgroundColor: Colors.gray200 },
  stepNum: { ...Typography.caption, color: Colors.gray600, fontWeight: '600' },
  stepNumActive: { color: Colors.white },
  stepLabel: { ...Typography.tag, color: Colors.gray500, textAlign: 'center' },
  stepLabelActive: { color: Colors.primary, fontWeight: '600' },

  sectionTitle: {
    ...Typography.h5, color: Colors.primary, marginTop: Spacing.md, marginBottom: Spacing.sm,
    paddingBottom: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.gray100,
  },
  scheduleHint: { ...Typography.caption, color: Colors.textSecondary, marginBottom: Spacing.md },

  avatarWrap: { alignItems: 'center', marginBottom: Spacing.lg },
  avatar: {
    width: 90, height: 90, borderRadius: 45, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.primary + '40',
    marginBottom: Spacing.sm,
  },
  avatarHint: { ...Typography.caption, color: Colors.textSecondary },

  row: { flexDirection: 'row', gap: Spacing.sm },
  rowHalf: { flex: 1 },

  fieldLabel: { ...Typography.label, color: Colors.text, marginBottom: Spacing.sm },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md },
  chip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray100, borderWidth: 1.5, borderColor: 'transparent',
  },
  chipSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { ...Typography.buttonSmall, color: Colors.textSecondary },
  chipTextSelected: { color: Colors.white },
  errorText: { ...Typography.caption, color: Colors.error, marginTop: -Spacing.sm, marginBottom: Spacing.sm },

  dayCard: {
    backgroundColor: Colors.gray50, borderRadius: BorderRadius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.gray100,
  },
  dayLabel: { ...Typography.label, color: Colors.primary, fontWeight: '600', marginBottom: Spacing.sm },

  uploadCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary + '08',
    borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.sm,
    borderWidth: 1.5, borderColor: Colors.primary + '20', borderStyle: 'dashed',
  },
  uploadCardDone: { backgroundColor: Colors.success + '10', borderColor: Colors.success + '40', borderStyle: 'solid' },
  uploadIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  uploadIconDone: { backgroundColor: Colors.success },
  uploadText: { flex: 1 },
  uploadLabel: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  uploadHint: { ...Typography.caption, color: Colors.textLight, marginTop: 2 },

  reviewCard: {
    backgroundColor: Colors.gray50, borderRadius: BorderRadius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.gray100, ...Shadow.sm,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  reviewTitle: { ...Typography.label, color: Colors.text, fontWeight: '600' },
  reviewRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: Colors.gray100,
  },
  reviewLabel: { ...Typography.bodySmall, color: Colors.textSecondary },
  reviewValue: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text, flex: 1, textAlign: 'right', marginLeft: Spacing.md },

  navRow: { flexDirection: 'column', gap: Spacing.md, marginTop: Spacing.lg },

  loginLink: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.lg },
  loginLinkText: { color: Colors.primary, fontWeight: '600' },
});
