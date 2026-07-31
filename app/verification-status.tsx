 import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function VerificationStatusScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Verification Status</Text>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <MaterialIcons name="hourglass-empty" size={48} color={Colors.warning} />
          </View>
          <Text style={styles.statusTitle}>Verification Pending</Text>
          <Text style={styles.statusMessage}>
            Your account is currently being reviewed. This usually takes 1-2 business days.
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
        </View>

        {/* Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uploaded Documents</Text>
          <View style={styles.documentRow}>
            <MaterialIcons name="description" size={24} color={Colors.success} />
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>School ID</Text>
              <Text style={styles.documentStatus}>Verified</Text>
            </View>
            <MaterialIcons name="check-circle" size={20} color={Colors.success} />
          </View>
          <View style={styles.documentRow}>
            <MaterialIcons name="description" size={24} color={Colors.warning} />
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>Government ID</Text>
              <Text style={styles.documentStatus}>Pending Review</Text>
            </View>
            <MaterialIcons name="hourglass-empty" size={20} color={Colors.warning} />
          </View>

          <PrimaryButton
            title="Upload Documents Again"
            onPress={() => {}}
            variant="outline"
            size="large"
            icon={<MaterialIcons name="cloud-upload" size={20} color={Colors.primary} />}
            style={{ marginTop: Spacing.md }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg, paddingTop: Spacing.xl },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.gray100,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  title: { ...Typography.h3, color: Colors.text },
  statusCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.xl,
    alignItems: 'center', ...Shadow.md, marginBottom: Spacing.md,
  },
  statusIconContainer: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.warning + '15',
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md,
  },
  statusTitle: { ...Typography.h4, color: Colors.text, marginBottom: Spacing.sm },
  statusMessage: {
    ...Typography.body, color: Colors.textSecondary, textAlign: 'center',
    marginBottom: Spacing.xl, lineHeight: 22,
  },
  progressContainer: {
    width: '100%', alignItems: 'center', paddingHorizontal: Spacing.lg,
  },
  progressStep: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: Spacing.xs },
  stepDot: {
    width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.gray200, marginRight: Spacing.md,
  },
  stepCompleted: { backgroundColor: Colors.success },
  stepActive: { backgroundColor: Colors.warning },
  stepLabel: { ...Typography.bodySmall, color: Colors.textSecondary },
  stepLabelActive: { ...Typography.bodySmall, color: Colors.warning, fontWeight: '600' },
  progressLine: {
    width: 2, height: 20, backgroundColor: Colors.gray200, marginLeft: 13, marginVertical: 4,
  },
  section: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, ...Shadow.sm,
  },
  sectionTitle: { ...Typography.h5, color: Colors.text, marginBottom: Spacing.md },
  documentRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.gray100,
  },
  documentInfo: { flex: 1 },
  documentName: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  documentStatus: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
});
