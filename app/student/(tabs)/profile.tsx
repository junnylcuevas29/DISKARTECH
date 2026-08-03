import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import BurgerMenu from '@/components/ui/BurgerMenu';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import {
  computeProfileCompletion,
  getFullName,
  registerStudentData
} from '@/data/studentProfile';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const profile = registerStudentData;
  const completion = computeProfileCompletion(profile);

  const scheduleDays = Object.entries(profile.schedule).filter(
    ([, v]) => v.class || v.avail
  );

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
              uri={profile.hasProfilePicture ? 'https://ui-avatars.com/api/?name=Junnyl+Mabini&background=D32F2F&color=fff&size=200' : undefined}
              name={getFullName(profile)}
              size={84}
              verified={profile.verificationStatus === 'verified'}
            />
            <TouchableOpacity style={styles.editBtn} onPress={() => router.push('/student/edit-profile')}>
              <MaterialIcons name="camera-alt" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{getFullName(profile)}</Text>
          <Text style={styles.userEmail}>{profile.email}</Text>
          <Badge
            text={profile.verificationStatus === 'verified' ? 'Verified Student' : 'Verification Pending'}
            variant={profile.verificationStatus === 'verified' ? 'success' : 'warning'}
            icon="verified"
            style={{ marginTop: Spacing.sm }}
          />
        </View>

        {/* Profile Completion */}
        <View style={styles.completionCard}>
          <View style={styles.completionHeader}>
            <Text style={styles.completionTitle}>Profile Completion</Text>
            <Text style={styles.completionPercent}>{completion}%</Text>
          </View>
          <View style={styles.completionTrack}>
            <View style={[styles.completionFill, { width: `${completion}%` }]} />
          </View>
          <Text style={styles.completionHint}>
            {completion < 100 ? 'Complete your profile to get more job matches!' : 'Great job! Your profile is complete 🎉'}
          </Text>
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => router.push('/student/edit-profile')}
          >
            <MaterialIcons name="edit" size={18} color={Colors.white} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <InfoRow icon="person" label="Full Name" value={getFullName(profile)} />
          <InfoRow icon="cake" label="Birthday" value={profile.birthday} />
          <InfoRow icon="tag" label="Age" value={profile.age} />
          <InfoRow icon="wc" label="Gender" value={profile.gender} />
          <InfoRow icon="phone" label="Mobile Number" value={profile.mobile} />
          <InfoRow icon="email" label="Email Address" value={profile.email} />
        </View>

        {/* School Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>School Information</Text>
          <InfoRow icon="school" label="School" value={profile.schoolName} />
          <InfoRow icon="menu-book" label="Course" value={profile.course || profile.strand} />
          <InfoRow icon="format-list-numbered" label="Year Level" value={profile.yearLevel} />
          <InfoRow icon="badge" label="Student Number" value={profile.studentNumber} />
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsGrid}>
            {profile.skills.map((skill) => (
              <View key={skill} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Job Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Preferences</Text>
          <InfoRow icon="work" label="Preferred Job Type" value={profile.jobTypes.join(', ') || '—'} />
          <InfoRow icon="location-on" label="Preferred Location" value={profile.locations.join(', ') || '—'} />
        </View>

        {/* Schedule Availability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule Availability</Text>
          {scheduleDays.map(([day, val]) => (
            <View key={day} style={styles.scheduleRow}>
              <View style={styles.scheduleDay}>
                <Text style={styles.scheduleDayText}>{day.slice(0, 3)}</Text>
              </View>
              <View style={styles.scheduleInfo}>
                {val.class ? (
                  <Text style={styles.scheduleClass}>Class: {val.class}</Text>
                ) : null}
                {val.avail ? (
                  <Text style={styles.scheduleAvail}>Available: {val.avail}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        {/* Documents */}
        <View style={[styles.section, { marginBottom: Spacing.xxl }]}>
          <Text style={styles.sectionTitle}>Uploaded Documents</Text>
          {profile.documents.map((doc) => (
            <View key={doc} style={styles.documentRow}>
              <MaterialIcons name="description" size={20} color={Colors.success} />
              <Text style={styles.documentText}>{doc}</Text>
              <MaterialIcons name="check-circle" size={18} color={Colors.success} />
            </View>
          ))}
        </View>
      </ScrollView>
      <BurgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.md,
  },
  burgerBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    ...Shadow.sm,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
  },
  headerSpacer: {
    width: 44,
  },
  profileCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadow.md,
    marginBottom: Spacing.md,
  },
  avatarSection: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  userName: {
    ...Typography.h4,
    color: Colors.text,
  },
  userEmail: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  completionCard: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.md,
    marginBottom: Spacing.md,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  completionTitle: {
    ...Typography.h5,
    color: Colors.white,
    fontWeight: '700',
  },
  completionPercent: {
    ...Typography.h4,
    color: Colors.white,
    fontWeight: '700',
  },
  completionTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  completionFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  completionHint: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.9)',
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
  },
  editProfileText: {
    ...Typography.buttonSmall,
    color: Colors.primary,
    fontWeight: '700',
  },
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  infoIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  infoValue: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '500',
    marginTop: 2,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  skillTag: {
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  skillText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '500',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  scheduleDay: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleDayText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '700',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleClass: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '500',
  },
  scheduleAvail: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  documentText: {
    ...Typography.bodySmall,
    color: Colors.text,
    flex: 1,
  },
});
