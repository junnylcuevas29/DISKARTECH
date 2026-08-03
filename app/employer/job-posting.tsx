import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const CATEGORIES = [
  'Food Service',
  'Retail',
  'Tutoring',
  'Delivery',
  'Admin',
  'Freelance',
  'Hospitality',
  'Other',
];

const WORKING_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const PAYMENT_TYPES = ['Daily', 'Weekly', 'Per Task'];

const STEP_LABELS = ['Job Info', 'Schedule', 'Compensation'];

export default function JobPostingScreen() {
  const [step, setStep] = useState(0);

  // Step 1: Job Information
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');

  // Step 2: Schedule
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');

  // Step 3: Compensation
  const [salary, setSalary] = useState('');
  const [paymentType, setPaymentType] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleDay = (day: string) =>
    setWorkingDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!jobTitle.trim()) e.jobTitle = 'Job title is required';
      if (!category) e.category = 'Please select a category';
      if (!description.trim()) e.description = 'Job description is required';
      if (!requiredSkills.trim()) e.requiredSkills = 'Required skills are needed';
    }
    if (s === 1) {
      if (workingDays.length === 0) e.workingDays = 'Select at least one working day';
      if (!startTime.trim()) e.startTime = 'Start time is required';
      if (!endTime.trim()) e.endTime = 'End time is required';
      if (!duration.trim()) e.duration = 'Duration is required';
    }
    if (s === 2) {
      if (!salary.trim()) e.salary = 'Salary is required';
      if (!paymentType) e.paymentType = 'Please select a payment type';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  };

  const back = () => {
    if (step === 0) router.back();
    else setStep((s) => s - 1);
  };

  const submit = () => {
    Alert.alert('Job Posted 🎉', 'Your job has been posted successfully. Applicants can now apply.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={back} style={styles.backBtn}>
              <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Text style={styles.title}>Post a New Job</Text>
              <Text style={styles.subtitle}>Step {step + 1} of 3</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${((step + 1) / 3) * 100}%` }]} />
          </View>

          {/* Step indicators */}
          <View style={styles.stepRow}>
            {STEP_LABELS.map((label, i) => (
              <View key={label} style={styles.stepItem}>
                <View
                  style={[styles.stepDot, i <= step ? styles.stepDotActive : styles.stepDotInactive]}
                >
                  {i < step ? (
                    <MaterialIcons name="check" size={14} color={Colors.white} />
                  ) : (
                    <Text style={[styles.stepNum, i <= step && styles.stepNumActive]}>{i + 1}</Text>
                  )}
                </View>
                <Text
                  style={[styles.stepLabel, i <= step && styles.stepLabelActive]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>

          {/* ============ STEP 1: JOB INFORMATION ============ */}
          {step === 0 && (
            <View>
              <Text style={styles.sectionTitle}>Job Information</Text>

              <InputField
                label="Job Title"
                placeholder="e.g. Service Crew, Barista, Tutor"
                icon="work"
                value={jobTitle}
                onChangeText={setJobTitle}
                error={errors.jobTitle}
              />

              <Text style={styles.fieldLabel}>Category</Text>
              <View style={styles.chipWrap}>
                {CATEGORIES.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.chip, category === c && styles.chipSelected]}
                    onPress={() => setCategory(c)}
                  >
                    <Text style={[styles.chipText, category === c && styles.chipTextSelected]}>
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

              <View style={styles.textAreaContainer}>
                <Text style={styles.label}>Job Description</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Describe the job responsibilities and expectations..."
                  placeholderTextColor={Colors.gray400}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  textAlignVertical="top"
                />
                {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
              </View>

              <InputField
                label="Required Skills"
                placeholder="e.g. Communication, Customer Service"
                icon="handyman"
                value={requiredSkills}
                onChangeText={setRequiredSkills}
                error={errors.requiredSkills}
              />
            </View>
          )}

          {/* ============ STEP 2: SCHEDULE ============ */}
          {step === 1 && (
            <View>
              <Text style={styles.sectionTitle}>Schedule</Text>

              <Text style={styles.fieldLabel}>Working Days</Text>
              <View style={styles.chipWrap}>
                {WORKING_DAYS.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[styles.chip, workingDays.includes(day) && styles.chipSelected]}
                    onPress={() => toggleDay(day)}
                  >
                    <Text
                      style={[styles.chipText, workingDays.includes(day) && styles.chipTextSelected]}
                    >
                      {day.slice(0, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.workingDays && <Text style={styles.errorText}>{errors.workingDays}</Text>}

              <View style={styles.timeRow}>
                <View style={styles.timeField}>
                  <InputField
                    label="Start Time"
                    placeholder="e.g. 6:00 PM"
                    icon="schedule"
                    value={startTime}
                    onChangeText={setStartTime}
                    error={errors.startTime}
                  />
                </View>
                <View style={styles.timeField}>
                  <InputField
                    label="End Time"
                    placeholder="e.g. 8:00 PM"
                    icon="schedule"
                    value={endTime}
                    onChangeText={setEndTime}
                    error={errors.endTime}
                  />
                </View>
              </View>

              <InputField
                label="Duration"
                placeholder="e.g. 2 hours per day"
                icon="timer"
                value={duration}
                onChangeText={setDuration}
                error={errors.duration}
              />
            </View>
          )}

          {/* ============ STEP 3: COMPENSATION ============ */}
          {step === 2 && (
            <View>
              <Text style={styles.sectionTitle}>Compensation</Text>

              <InputField
                label="Salary"
                placeholder="e.g. ₱75 - ₱95/hr"
                icon="attach-money"
                value={salary}
                onChangeText={setSalary}
                error={errors.salary}
              />

              <Text style={styles.fieldLabel}>Payment Type</Text>
              <View style={styles.chipWrap}>
                {PAYMENT_TYPES.map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[styles.chip, paymentType === p && styles.chipSelected]}
                    onPress={() => setPaymentType(p)}
                  >
                    <Text style={[styles.chipText, paymentType === p && styles.chipTextSelected]}>
                      {p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.paymentType && <Text style={styles.errorText}>{errors.paymentType}</Text>}
            </View>
          )}

          {/* Navigation buttons */}
          <View style={styles.navRow}>
            {step < 2 ? (
              <PrimaryButton
                title="Continue"
                size="medium"
                onPress={next}
                icon={<MaterialIcons name="arrow-forward" size={18} color={Colors.white} />}
              />
            ) : (
              <PrimaryButton
                title="POST JOB"
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.xxxl },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.gray100,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  headerText: { flex: 1 },
  title: { ...Typography.h3, color: Colors.text },
  subtitle: { ...Typography.body, color: Colors.textSecondary },
  progressTrack: {
    height: 6, borderRadius: 3, backgroundColor: Colors.gray100,
    overflow: 'hidden', marginTop: Spacing.md, marginBottom: Spacing.md,
  },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  stepRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.lg },
  stepItem: { alignItems: 'center', flex: 1 },
  stepDot: {
    width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
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
  textAreaContainer: { marginBottom: Spacing.md },
  label: { ...Typography.label, color: Colors.text, marginBottom: Spacing.sm },
  textArea: {
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    padding: Spacing.md, backgroundColor: Colors.white, ...Typography.body, color: Colors.text,
    minHeight: 100,
  },
  timeRow: { flexDirection: 'row', gap: Spacing.md },
  timeField: { flex: 1 },
  navRow: { flexDirection: 'column', gap: Spacing.md, marginTop: Spacing.lg },
});
