import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/typography';
import { registerEmployerData } from '@/data/employerProfile';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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

const BUSINESS_DOCS = ['Business Permit', 'Mayor Permit', 'Barangay Clearance'];
const INDIVIDUAL_DOCS = ['Government ID'];

export default function EmployerEditProfileScreen() {
  const [businessName, setBusinessName] = useState(registerEmployerData.businessName);
  const [ownerName, setOwnerName] = useState(registerEmployerData.ownerName);
  const [businessType, setBusinessType] = useState(registerEmployerData.businessType);
  const [businessAddress, setBusinessAddress] = useState(registerEmployerData.businessAddress);
  const [contactNumber, setContactNumber] = useState(registerEmployerData.contactNumber);
  const [email, setEmail] = useState(registerEmployerData.email);
  const [verificationType, setVerificationType] = useState<'Business' | 'Individual'>(registerEmployerData.verificationType);
  const [documents, setDocuments] = useState<string[]>(registerEmployerData.documents);

  const requiredDocs = verificationType === 'Business' ? BUSINESS_DOCS : INDIVIDUAL_DOCS;

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const handleSave = () => {
    Alert.alert('Profile Updated ✅', 'Your business profile has been saved successfully.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Edit Profile</Text>
            <Text style={styles.subtitle}>Update the info you registered with</Text>
          </View>
        </View>

        {/* Business Info */}
        <Text style={styles.sectionTitle}>Business Information</Text>
        <View style={styles.section}>
          <InputField label="Business Name" icon="business" value={businessName} onChangeText={setBusinessName} />
          <InputField label="Owner Name" icon="person" value={ownerName} onChangeText={setOwnerName} />

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

          <InputField label="Business Address" icon="location-on" value={businessAddress} onChangeText={setBusinessAddress} />
        </View>

        {/* Contact Info */}
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.section}>
          <InputField label="Contact Number" icon="phone" value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" />
          <InputField label="Email Address" icon="email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>

        {/* Verification */}
        <Text style={styles.sectionTitle}>Verification Documents</Text>
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Verification Type</Text>
          <View style={styles.chipWrap}>
            {(['Business', 'Individual'] as const).map((t) => (
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

          {requiredDocs.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.uploadCard, documents.includes(d) && styles.uploadCardDone]}
              onPress={() => setDocuments(toggle(documents, d))}
              activeOpacity={0.7}
            >
              <View style={[styles.uploadIcon, documents.includes(d) && styles.uploadIconDone]}>
                <MaterialIcons
                  name={documents.includes(d) ? 'check' : 'description'}
                  size={20}
                  color={documents.includes(d) ? Colors.white : Colors.primary}
                />
              </View>
              <Text style={styles.uploadLabel}>{d}</Text>
              <MaterialIcons
                name={documents.includes(d) ? 'check-circle' : 'cloud-upload'}
                size={20}
                color={documents.includes(d) ? Colors.success : Colors.primary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton
          title="Save Changes"
          size="large"
          onPress={handleSave}
          icon={<MaterialIcons name="check" size={20} color={Colors.white} />}
          style={{ marginTop: Spacing.sm }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.xxl },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  headerText: { flex: 1 },
  title: { ...Typography.h3, color: Colors.text },
  subtitle: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: {
    ...Typography.h5, color: Colors.primary, marginBottom: Spacing.sm,
    paddingBottom: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.gray100,
    marginTop: Spacing.sm,
  },
  section: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    marginBottom: Spacing.sm,
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
  uploadCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.primary + '08', borderRadius: BorderRadius.lg,
    padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1.5,
    borderColor: Colors.primary + '20', borderStyle: 'dashed',
  },
  uploadCardDone: {
    backgroundColor: Colors.success + '10', borderColor: Colors.success + '40', borderStyle: 'solid',
  },
  uploadIcon: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  uploadIconDone: { backgroundColor: Colors.success },
  uploadLabel: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text, flex: 1 },
});
