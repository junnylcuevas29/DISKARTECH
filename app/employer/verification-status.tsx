import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Status = 'pending' | 'approved' | 'rejected';

const STATUSES: { key: Status; label: string; icon: 'hourglass-empty' | 'check-circle' | 'cancel'; color: string }[] = [
  { key: 'pending', label: 'Pending', icon: 'hourglass-empty', color: Colors.warning },
  { key: 'approved', label: 'Approved', icon: 'check-circle', color: Colors.success },
  { key: 'rejected', label: 'Rejected', icon: 'cancel', color: Colors.error },
];

const DOCUMENTS = ['Business Permit', 'Mayor Permit', 'Barangay Clearance'];

export default function EmployerVerificationStatusScreen() {
  const [status, setStatus] = useState<Status>('pending');

  const documentStatusText = (): { label: string; color: string; icon: 'check-circle' | 'hourglass-empty' | 'cancel' } => {
    if (status === 'approved') return { label: 'Verified', color: Colors.success, icon: 'check-circle' };
    if (status === 'rejected') return { label: 'Rejected', color: Colors.error, icon: 'cancel' };
    return { label: 'Pending Review', color: Colors.warning, icon: 'hourglass-empty' };
  };

  const docStatus = documentStatusText();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Verification Status</Text>
        </View>

        {/* Status selector */}
        <View style={styles.statusTabs}>
          {STATUSES.map((s) => (
            <TouchableOpacity
              key={s.key}
              style={[styles.statusTab, status === s.key && { backgroundColor: s.color + '15', borderColor: s.color }]}
              onPress={() => setStatus(s.key)}
            >
              <MaterialIcons name={s.icon} size={16} color={status === s.key ? s.color : Colors.textSecondary} />
              <Text style={[styles.statusTabText, status === s.key && { color: s.color }]}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={[styles.statusIconContainer, { backgroundColor: STATUSES.find((s) => s.key === status)?.color + '15' }]}>
            <MaterialIcons
              name={STATUSES.find((s) => s.key === status)?.icon}
              size={48}
              color={STATUSES.find((s) => s.key === status)?.color}
            />
          </View>
          {status === 'pending' && (
            <>
              <Text style={styles.statusTitle}>Verification Pending</Text>
              <Text style={styles.statusMessage}>
                Your business account is currently being reviewed. This usually takes 1-2 business
                days.
              </Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressStep}>
                  <View style={[styles.stepDot, styles.stepCompleted]}>
                    <MaterialIcons name="check" size={16} color={Colors.white} />
                  </View>
                  <Text style={styles.stepLabel}>Documents Submitted</Text>
                </View>
                <View style={styles.progressLine} />
                <View style={styles.progressStep}>
                  <View style={[styles.stepDot, styles.stepActive]}>
                    <MaterialIcons name="hourglass-empty" size={16} color={Colors.white} />
                  </View>
                  <Text style={styles.stepLabelActive}>Under Review</Text>
                </View>
                <View style={styles.progressLine} />
                <View style={styles.progressStep}>
                  <View style={styles.stepDot}>
                    <MaterialIcons name="check" size={16} color={Colors.gray400} />
                  </View>
                  <Text style={styles.stepLabel}>Verified</Text>
                </View>
              </View>
            </>
          )}
          {status === 'approved' && (
            <>
              <Text style={[styles.statusTitle, { color: Colors.success }]}>Business Verified</Text>
              <Text style={styles.statusMessage}>
                Congratulations! Your business account has been approved. You can now post jobs and
                manage applicants.
              </Text>
<PrimaryButton
                title="Go to Dashboard"
                onPress={() => router.replace('/employer/(tabs)/home')}
                size="large"
                icon={<MaterialIcons name="dashboard" size={20} color={Colors.white} />}
              />
            </>
          )}
          {status === 'rejected' && (
            <>
              <Text style={[styles.statusTitle, { color: Colors.error }]}>Verification Rejected</Text>
              <Text style={styles.statusMessage}>
                Your submitted documents did not pass verification. Please review and resubmit the
                required documents.
              </Text>
              <PrimaryButton
                title="Resubmit Documents"
                onPress={() => {}}
                variant="outline"
                size="large"
                icon={<MaterialIcons name="cloud-upload" size={20} color={Colors.primary} />}
              />
            </>
          )}
        </View>

        {/* Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uploaded Documents</Text>
          <Text style={styles.sectionSubtitle}>Business · Requirements</Text>
          {DOCUMENTS.map((doc) => (
            <View key={doc} style={styles.documentRow}>
              <MaterialIcons name="description" size={24} color={docStatus.color} />
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>{doc}</Text>
                <Text style={[styles.documentStatus, { color: docStatus.color }]}>
                  {docStatus.label}
                </Text>
              </View>
              <MaterialIcons name={docStatus.icon} size={20} color={docStatus.color} />
            </View>
          ))}

          {status !== 'approved' && (
            <PrimaryButton
              title={status === 'rejected' ? 'Upload Documents Again' : 'Upload Documents Again'}
              onPress={() => {}}
              variant="outline"
              size="large"
              icon={<MaterialIcons name="cloud-upload" size={20} color={Colors.primary} />}
              style={{ marginTop: Spacing.md }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  title: { ...Typography.h3, color: Colors.text },
  statusTabs: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  statusTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    backgroundColor: Colors.white,
  },
  statusTabText: { ...Typography.buttonSmall, color: Colors.textSecondary },
  statusCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadow.md,
    marginBottom: Spacing.md,
  },
  statusIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  statusTitle: { ...Typography.h4, color: Colors.text, marginBottom: Spacing.sm },
  statusMessage: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  progressStep: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: Spacing.xs },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray200,
    marginRight: Spacing.md,
  },
  stepCompleted: { backgroundColor: Colors.success },
  stepActive: { backgroundColor: Colors.warning },
  stepLabel: { ...Typography.bodySmall, color: Colors.textSecondary },
  stepLabelActive: { ...Typography.bodySmall, color: Colors.warning, fontWeight: '600' },
  progressLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.gray200,
    marginLeft: 13,
    marginVertical: 4,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  sectionTitle: { ...Typography.h5, color: Colors.text, marginBottom: 2 },
  sectionSubtitle: { ...Typography.caption, color: Colors.textSecondary, marginBottom: Spacing.md },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  documentInfo: { flex: 1 },
  documentName: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  documentStatus: { ...Typography.caption, marginTop: 2 },
});

