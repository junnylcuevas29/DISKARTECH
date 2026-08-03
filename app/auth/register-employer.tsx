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
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// ---------- Data options ----------
const BUSINESS_TYPES = [
  'Food & Beverage',
  'Retail',
  'Services',
  'Construction',
  'Technology',
  'Education',
  'Healthcare',
  'Transportation',
  'Entertainment',
  'Other',
];
const VERIFICATION_TYPES = ['Business', 'Individual'];

const BUSINESS_DOCS = ['Business Permit', 'Mayor Permit', 'Barangay Clearance'];
const INDIVIDUAL_DOCS = ['Government ID'];


const STEP_LABELS = ['Business Info', 'Account', 'Verification'];

export default function RegisterEmployerScreen() {
  const [step, setStep] = useState(0);

  // Step 0 - Business Info
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');

  // Step 1 - Contact & Account
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2 - Verification
  const [verificationType, setVerificationType] = useState('Business');
  const [documents, setDocuments] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const requiredDocs = verificationType === 'Business' ? BUSINESS_DOCS : INDIVIDUAL_DOCS;

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!businessName.trim()) e.businessName = 'Business name is required';
      if (!ownerName.trim()) e.ownerName = 'Owner name is required';
      if (!businessType) e.businessType = 'Please select a business type';
      if (!businessAddress.trim()) e.businessAddress = 'Business address is required';
    }
    if (s === 1) {
      if (!contactNumber.trim()) e.contactNumber = 'Contact number is required';
      if (!email.trim()) e.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email';
      if (!password) e.password = 'Password is required';
      else if (password.length < 6) e.password = 'Password must be at least 6 characters';
      if (!confirmPassword) e.confirmPassword = 'Please confirm your password';
      else if (confirmPassword !== password) e.confirmPassword = 'Passwords do not match';
    }
    if (s === 2) {
      const missing = requiredDocs.filter((r) => !documents.includes(r));
      if (missing.length > 0) e.documents = `Please upload: ${missing.join(', ')}`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 2));
    }
  };

  const back = () => {
    if (step === 0) router.back();
    else setStep((s) => s - 1);
  };

  const submit = () => {
    Alert.alert(
      'Application Submitted 🎉',
      'Your business account has been created and is pending verification.',
      [{ text: 'OK', onPress: () => router.replace('/employer/verification-status') }]
    );
  };

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
            <TouchableOpacity
              style={styles.inactiveTab}
              onPress={() => router.push('/auth/register-student')}
            >
              <MaterialIcons name="school" size={20} color={Colors.textSecondary} />
              <Text style={styles.inactiveTabText}>Student</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activeTab}>
              <MaterialIcons name="business" size={20} color={Colors.white} />
              <Text style={styles.activeTabText}>Employer</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Create Employer Account</Text>
          <Text style={styles.subtitle}>Step {step + 1} of 3</Text>

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

          {/* ============ STEP 1: BUSINESS INFO ============ */}
          {step === 0 && (
            <View>
              <Text style={styles.sectionTitle}>Business Information</Text>

              <InputField
                label="Business Name"
                placeholder="Enter business name"
                icon="business"
                value={businessName}
                onChangeText={setBusinessName}
                error={errors.businessName}
              />
              <InputField
                label="Owner Name"
                placeholder="Your full name"
                icon="person"
                value={ownerName}
                onChangeText={setOwnerName}
                error={errors.ownerName}
              />

              <Text style={styles.fieldLabel}>Business Type</Text>
              <View style={styles.chipWrap}>
                {BUSINESS_TYPES.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.chip, businessType === t && styles.chipSelected]}
                    onPress={() => setBusinessType(t)}
                  >
                    <Text style={[styles.chipText, businessType === t && styles.chipTextSelected]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.businessType && <Text style={styles.errorText}>{errors.businessType}</Text>}

              <InputField
                label="Business Address"
                placeholder="Complete business address"
                icon="location-on"
                value={businessAddress}
                onChangeText={setBusinessAddress}
                error={errors.businessAddress}
              />
            </View>
          )}

          {/* ============ STEP 2: CONTACT & ACCOUNT ============ */}
          {step === 1 && (
            <View>
              <Text style={styles.sectionTitle}>Contact & Account</Text>

              <InputField
                label="Contact Number"
                placeholder="e.g. 0917 123 4567"
                icon="phone"
                keyboardType="phone-pad"
                value={contactNumber}
                onChangeText={setContactNumber}
                error={errors.contactNumber}
              />
              <InputField
                label="Email Address"
                placeholder="Business email"
                icon="email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
              />
              <InputField
                label="Password"
                placeholder="Create a password"
                isPassword
                icon="lock"
                value={password}
                onChangeText={setPassword}
                error={errors.password}
              />
              <InputField
                label="Confirm Password"
                placeholder="Confirm your password"
                isPassword
                icon="lock"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={errors.confirmPassword}
              />
            </View>
          )}

          {/* ============ STEP 3: VERIFICATION ============ */}
          {step === 2 && (
            <View>
              <Text style={styles.sectionTitle}>Employer Verification</Text>
              <Text style={styles.scheduleHint}>
                Choose your verification type and upload the required documents.
              </Text>

              <Text style={styles.fieldLabel}>Verification Type</Text>
              <View style={styles.chipWrap}>
                {VERIFICATION_TYPES.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.chip, verificationType === t && styles.chipSelected]}
                    onPress={() => {
                      setVerificationType(t);
                      setDocuments([]);
                    }}
                  >
                    <Text style={[styles.chipText, verificationType === t && styles.chipTextSelected]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.sectionTitle, { marginTop: Spacing.md }]}>
                {verificationType === 'Business'
                  ? 'Business Requirements'
                  : 'Individual Requirement'}
              </Text>
              {requiredDocs.map((d) => (
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
              {errors.documents && <Text style={styles.errorText}>{errors.documents}</Text>}
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
  onPress,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  uploaded: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.uploadCard, uploaded && styles.uploadCardDone]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.uploadIcon, uploaded && styles.uploadIconDone]}>
        <MaterialIcons
          name={uploaded ? 'check' : icon}
          size={24}
          color={uploaded ? Colors.white : Colors.primary}
        />
      </View>
      <View style={styles.uploadText}>
        <Text style={styles.uploadLabel}>{label}</Text>
        <Text style={styles.uploadHint}>Required · PDF, JPG or PNG (Max 5MB)</Text>
      </View>
      <MaterialIcons
        name={uploaded ? 'check-circle' : 'cloud-upload'}
        size={24}
        color={uploaded ? Colors.success : Colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollView: { flex: 1 },
  content: { padding: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.xxxl },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.gray100,
    borderRadius: BorderRadius.lg,
    padding: 4,
    marginBottom: Spacing.xl,
  },
  activeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 12,
  },
  activeTabText: { ...Typography.buttonSmall, color: Colors.white },
  inactiveTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: 12,
  },
  inactiveTabText: { ...Typography.buttonSmall, color: Colors.textSecondary },
  title: { ...Typography.h3, color: Colors.text, marginBottom: Spacing.xs },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.md },

  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray100,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  stepRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.lg },
  stepItem: { alignItems: 'center', flex: 1 },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepDotActive: { backgroundColor: Colors.primary },
  stepDotInactive: { backgroundColor: Colors.gray200 },
  stepNum: { ...Typography.caption, color: Colors.gray600, fontWeight: '600' },
  stepNumActive: { color: Colors.white },
  stepLabel: { ...Typography.tag, color: Colors.gray500, textAlign: 'center' },
  stepLabelActive: { color: Colors.primary, fontWeight: '600' },

  sectionTitle: {
    ...Typography.h5,
    color: Colors.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  scheduleHint: { ...Typography.caption, color: Colors.textSecondary, marginBottom: Spacing.md },

  fieldLabel: { ...Typography.label, color: Colors.text, marginBottom: Spacing.sm },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray100,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { ...Typography.buttonSmall, color: Colors.textSecondary },
  chipTextSelected: { color: Colors.white },
  errorText: { ...Typography.caption, color: Colors.error, marginTop: -Spacing.sm, marginBottom: Spacing.sm },

  uploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '08',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.primary + '20',
    borderStyle: 'dashed',
  },
  uploadCardDone: {
    backgroundColor: Colors.success + '10',
    borderColor: Colors.success + '40',
    borderStyle: 'solid',
  },
  uploadIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  uploadIconDone: { backgroundColor: Colors.success },
  uploadText: { flex: 1 },
  uploadLabel: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  uploadHint: { ...Typography.caption, color: Colors.textLight, marginTop: 2 },

navRow: { flexDirection: 'column', gap: Spacing.md, marginTop: Spacing.lg },

  loginLink: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.lg },
  loginLinkText: { color: Colors.primary, fontWeight: '600' },
});

