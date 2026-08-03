import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import EmployerBurgerMenu from '@/components/ui/EmployerBurgerMenu';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { employerRatings, employerWorkers } from '@/data/employerApplicants';
import { computeEmployerProfileCompletion, registerEmployerData } from '@/data/employerProfile';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmployerProfileScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const profile = registerEmployerData;
  const completion = computeEmployerProfileCompletion(profile);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.burgerBtn}>
            <MaterialIcons name="menu" size={26} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarSection}>
            <Avatar
              uri="https://ui-avatars.com/api/?name=McDonalds&background=D32F2F&color=fff&size=200"
              name={profile.businessName}
              size={84}
              verified={profile.verificationStatus === 'verified'}
            />
            <TouchableOpacity style={styles.editBtn} onPress={() => router.push('/employer/edit-profile')}>
              <MaterialIcons name="camera-alt" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{profile.businessName}</Text>
          <Text style={styles.userEmail}>{profile.email}</Text>
          <Badge
            text={profile.verificationStatus === 'verified' ? 'Verified Business' : 'Verification Pending'}
            variant={profile.verificationStatus === 'verified' ? 'success' : 'warning'}
            icon="verified"
            style={{ marginTop: Spacing.sm }}
          />
        </View>

        {/* Profile Completion */}
        <View style={styles.completionCard}>
          <View style={styles.completionHeader}>
            <Text style={styles.completionTitle}>Business Profile Completion</Text>
            <Text style={styles.completionPercent}>{completion}%</Text>
          </View>
          <View style={styles.completionTrack}>
            <View style={[styles.completionFill, { width: `${completion}%` }]} />
          </View>
          <Text style={styles.completionHint}>
            {completion < 100 ? 'Complete your profile to attract more applicants!' : 'Great job! Your business profile is complete 🎉'}
          </Text>
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => router.push('/employer/edit-profile')}
          >
            <MaterialIcons name="edit" size={18} color={Colors.white} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Business Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          <InfoRow icon="business" label="Business Name" value={profile.businessName} />
          <InfoRow icon="person" label="Owner Name" value={profile.ownerName} />
          <InfoRow icon="category" label="Business Type" value={profile.businessType} />
          <InfoRow icon="location-on" label="Business Address" value={profile.businessAddress} />
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <InfoRow icon="phone" label="Contact Number" value={profile.contactNumber} />
          <InfoRow icon="email" label="Email Address" value={profile.email} />
        </View>

        {/* Verification */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification</Text>
          <InfoRow icon="verified" label="Verification Type" value={profile.verificationType} />
          {profile.documents.map((doc) => (
            <View key={doc} style={styles.documentRow}>
              <MaterialIcons name="description" size={20} color={Colors.success} />
              <Text style={styles.documentText}>{doc}</Text>
              <MaterialIcons name="check-circle" size={18} color={Colors.success} />
            </View>
          ))}
        </View>

        {/* Worker Management */}
        <View style={styles.section}>
          <View style={styles.subHeader}>
            <Text style={styles.sectionTitle}>Worker Management</Text>
            <TouchableOpacity onPress={() => router.push('/employer/(tabs)/applicants')}>
              <Text style={styles.seeAll}>Manage</Text>
            </TouchableOpacity>
          </View>
          {employerWorkers.map((worker) => (
            <View key={worker.id} style={styles.workerRow}>
              <Avatar name={worker.name} size={40} />
              <View style={styles.workerInfo}>
                <Text style={styles.workerName}>{worker.name}</Text>
                <Text style={styles.workerPosition}>{worker.position}</Text>
                <Text style={styles.workerSchedule}>{worker.schedule}</Text>
              </View>
              <View style={styles.workerRight}>
                <Badge text="Active" variant="success" size="small" />
                <Text style={styles.workerJobs}>{worker.completedJobs} jobs done</Text>
                <Text style={styles.workerPayment}>{worker.payment}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Employer Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employer Rating</Text>
          <Text style={styles.ratingSubtitle}>How students rated you</Text>
          <View style={styles.ratingSummary}>
            <View style={styles.ratingBig}>
              <Text style={styles.ratingBigValue}>{employerRatings.overall}</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <MaterialIcons key={i} name="star" size={16} color={Colors.warning} />
                ))}
              </View>
              <Text style={styles.ratingCount}>{employerRatings.totalReviews} reviews</Text>
            </View>
            <View style={styles.ratingBreakdown}>
              <RatingBar label="Payment Reliability" value={employerRatings.paymentReliability} />
              <RatingBar label="Communication" value={employerRatings.communication} />
              <RatingBar label="Work Condition" value={employerRatings.workCondition} />
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutSection, { marginBottom: Spacing.xxl }]}
          onPress={() => router.replace('/auth/welcome')}
          activeOpacity={0.7}
        >
          <View style={styles.logoutContent}>
            <View style={styles.logoutIconWrap}>
              <MaterialIcons name="logout" size={22} color={Colors.error} />
            </View>
            <View style={styles.logoutTextWrap}>
              <Text style={styles.logoutLabel}>Logout</Text>
              <Text style={styles.logoutDesc}>Sign out from your account</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={Colors.gray400} />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <EmployerBurgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}

function InfoRow({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconWrap}>
        <MaterialIcons name={icon} size={18} color={Colors.primary} />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.ratingBarRow}>
      <Text style={styles.ratingBarLabel}>{label}</Text>
      <View style={styles.ratingBarTrack}>
        <View style={[styles.ratingBarFill, { width: `${(value / 5) * 100}%` }]} />
      </View>
      <Text style={styles.ratingBarValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl, paddingBottom: Spacing.md,
  },
  burgerBtn: {
    width: 44, height: 44, borderRadius: BorderRadius.md, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md, ...Shadow.sm,
  },
  title: { ...Typography.h2, color: Colors.text, flex: 1 },
  headerSpacer: { width: 44 },
  profileCard: {
    backgroundColor: Colors.white, marginHorizontal: Spacing.lg, borderRadius: BorderRadius.xl,
    padding: Spacing.lg, alignItems: 'center', ...Shadow.md, marginBottom: Spacing.md,
  },
  avatarSection: { position: 'relative', marginBottom: Spacing.md },
  editBtn: {
    position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.white,
  },
  userName: { ...Typography.h4, color: Colors.text },
  userEmail: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  completionCard: {
    backgroundColor: Colors.primary, marginHorizontal: Spacing.lg, borderRadius: BorderRadius.xl,
    padding: Spacing.lg, ...Shadow.md, marginBottom: Spacing.md,
  },
  completionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  completionTitle: { ...Typography.h5, color: Colors.white, fontWeight: '700' },
  completionPercent: { ...Typography.h4, color: Colors.white, fontWeight: '700' },
  completionTrack: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)', overflow: 'hidden' },
  completionFill: { height: '100%', backgroundColor: Colors.white, borderRadius: 4 },
  completionHint: { ...Typography.caption, color: 'rgba(255,255,255,0.9)', marginTop: Spacing.sm, marginBottom: Spacing.md },
  editProfileBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    backgroundColor: Colors.white, borderRadius: BorderRadius.md, paddingVertical: Spacing.md,
  },
  editProfileText: { ...Typography.buttonSmall, color: Colors.primary, fontWeight: '700' },
  section: {
    backgroundColor: Colors.white, marginHorizontal: Spacing.lg, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, marginBottom: Spacing.md, ...Shadow.sm,
  },
  sectionTitle: { ...Typography.h5, color: Colors.text, marginBottom: Spacing.md, paddingBottom: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  subHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '600' },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, marginBottom: Spacing.md },
  infoIconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary + '10', alignItems: 'center', justifyContent: 'center' },
  infoText: { flex: 1 },
  infoLabel: { ...Typography.caption, color: Colors.textLight },
  infoValue: { ...Typography.bodySmall, color: Colors.text, fontWeight: '500', marginTop: 2 },
  documentRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.gray100,
  },
  documentText: { ...Typography.bodySmall, color: Colors.text, flex: 1 },
  workerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  workerInfo: { flex: 1 },
  workerName: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  workerPosition: { ...Typography.caption, color: Colors.textSecondary },
  workerSchedule: { ...Typography.caption, color: Colors.textLight, marginTop: 2 },
  workerRight: { alignItems: 'flex-end', gap: 2 },
  workerJobs: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  workerPayment: { ...Typography.caption, color: Colors.success, fontWeight: '600' },
  ratingSubtitle: { ...Typography.caption, color: Colors.textSecondary, marginTop: -Spacing.sm, marginBottom: Spacing.md },
  ratingSummary: { flexDirection: 'row', alignItems: 'center' },
  ratingBig: { alignItems: 'center', paddingRight: Spacing.lg, borderRightWidth: 1, borderRightColor: Colors.gray100, marginRight: Spacing.lg },
  ratingBigValue: { ...Typography.h2, color: Colors.text },
  starsRow: { flexDirection: 'row', marginTop: 4 },
  ratingCount: { ...Typography.caption, color: Colors.textSecondary, marginTop: 4 },
  ratingBreakdown: { flex: 1 },
  ratingBarRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  ratingBarLabel: { ...Typography.caption, color: Colors.textSecondary, width: 100 },
  ratingBarTrack: { flex: 1, height: 6, borderRadius: 3, backgroundColor: Colors.gray200, overflow: 'hidden' },
  ratingBarFill: { height: '100%', backgroundColor: Colors.warning, borderRadius: 3 },
  ratingBarValue: { ...Typography.caption, color: Colors.text, fontWeight: '600', width: 24, textAlign: 'right' },
  logoutSection: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    marginHorizontal: Spacing.lg, ...Shadow.sm,
  },
  logoutContent: { flexDirection: 'row', alignItems: 'center' },
  logoutIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.error + '15', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  logoutTextWrap: { flex: 1 },
  logoutLabel: { ...Typography.bodySmall, fontWeight: '600', color: Colors.error },
  logoutDesc: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
});
