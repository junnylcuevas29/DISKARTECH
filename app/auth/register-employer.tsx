import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function RegisterEmployerScreen() {
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
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
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
          <Text style={styles.subtitle}>Register your business to post jobs</Text>

          {/* Business Information */}
          <Text style={styles.sectionTitle}>Business Information</Text>
          <InputField label="Business Name" placeholder="Enter business name" icon="business" />
          <InputField label="Employer Name" placeholder="Your full name" icon="person" />
          <InputField label="Business Type" placeholder="e.g. Food & Beverage" icon="category" />
          <InputField label="Email" placeholder="Business email" keyboardType="email-address" autoCapitalize="none" icon="email" />
          <InputField label="Phone" placeholder="Business phone number" keyboardType="phone-pad" icon="phone" />
          <InputField label="Business Address" placeholder="Complete business address" icon="location-on" />

          {/* Document Upload */}
          <Text style={styles.sectionTitle}>Verify Your Business</Text>
          <UploadCard icon="assignment" label="Upload Business Permit" />
          <UploadCard icon="credit-card" label="Upload Government ID" />

          <PrimaryButton
            title="Create Business Account"
onPress={() => router.replace('/employer-dashboard')}
            size="large"
            style={{ marginTop: Spacing.lg }}
          />

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

function UploadCard({ icon, label }: { icon: keyof typeof MaterialIcons.glyphMap; label: string }) {
  return (
    <TouchableOpacity style={styles.uploadCard}>
      <View style={styles.uploadIcon}>
        <MaterialIcons name={icon} size={24} color={Colors.primary} />
      </View>
      <View style={styles.uploadText}>
        <Text style={styles.uploadLabel}>{label}</Text>
        <Text style={styles.uploadHint}>PDF, JPG or PNG (Max 5MB)</Text>
      </View>
      <MaterialIcons name="cloud-upload" size={24} color={Colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxxl,
  },
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
  activeTabText: {
    ...Typography.buttonSmall,
    color: Colors.white,
  },
  inactiveTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: 12,
  },
  inactiveTabText: {
    ...Typography.buttonSmall,
    color: Colors.textSecondary,
  },
  title: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
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
  uploadIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  uploadText: {
    flex: 1,
  },
  uploadLabel: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
  },
  uploadHint: {
    ...Typography.caption,
    color: Colors.textLight,
    marginTop: 2,
  },
  loginLink: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
  loginLinkText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

