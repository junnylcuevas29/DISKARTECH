import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const menuItems = [
  { icon: 'settings', label: 'Settings', route: '/settings' },
  { icon: 'help-outline', label: 'Help Center', route: '#' },
  { icon: 'info-outline', label: 'About DiskarTech', route: '#' },
  { icon: 'logout', label: 'Logout', route: '/auth/welcome', danger: true },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarSection}>
          <Avatar
            uri="https://ui-avatars.com/api/?name=Junnyl+Mabini&background=D32F2F&color=fff&size=200"
            name="Junnyl Mabini"
            size={80}
            verified
          />
          <TouchableOpacity style={styles.editBtn}>
            <MaterialIcons name="camera-alt" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Junnyl Mabini</Text>
        <Text style={styles.userEmail}>junnyl.mabini@example.com</Text>
        <Badge text="Verified Student" variant="success" icon="verified" style={{ marginTop: Spacing.sm }} />
      </View>

      {/* Student Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Information</Text>
        <InfoRow icon="school" label="School" value="University of the Philippines" />
        <InfoRow icon="menu-book" label="Course" value="BS Computer Science" />
        <InfoRow icon="format-list-numbered" label="Year Level" value="3rd Year" />
        <InfoRow icon="location-on" label="Location" value="Quezon City" />
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsGrid}>
          {['Communication', 'Teamwork', 'MS Office', 'Python', 'Customer Service', 'Time Management'].map(
            (skill) => (
              <View key={skill} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            )
          )}
        </View>
      </View>

      {/* Schedule */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Availability</Text>
        <InfoRow icon="schedule" label="Available Schedule" value="Weekends, Afternoon" />
        <InfoRow icon="work" label="Preferred Job Type" value="Food Service, Retail, Tutoring" />
      </View>

      {/* Resume */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resume</Text>
        <TouchableOpacity style={styles.resumeCard}>
          <View style={styles.resumeIcon}>
            <MaterialIcons name="description" size={28} color={Colors.primary} />
          </View>
          <View style={styles.resumeInfo}>
            <Text style={styles.resumeName}>Junnyl_Mabini_Resume.pdf</Text>
            <Text style={styles.resumeSize}>Updated 2 weeks ago</Text>
          </View>
          <MaterialIcons name="file-download" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, index === menuItems.length - 1 && styles.menuItemLast]}
            onPress={() => {
              if (item.route === '/auth/welcome') {
                router.replace(item.route as any);
              } else if (item.route !== '#') {
                router.push(item.route as any);
              }
            }}
          >
            <MaterialIcons
              name={item.icon as any}
              size={22}
              color={item.danger ? Colors.error : Colors.text}
            />
            <Text style={[styles.menuLabel, item.danger && { color: Colors.error }]}>
              {item.label}
            </Text>
            <MaterialIcons name="chevron-right" size={22} color={Colors.gray400} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <MaterialIcons name={icon} size={18} color={Colors.gray500} />
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
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
  resumeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '08',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  resumeIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeInfo: {
    flex: 1,
  },
  resumeName: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
  },
  resumeSize: {
    ...Typography.caption,
    color: Colors.textLight,
    marginTop: 2,
  },
  menuSection: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xxl,
    ...Shadow.sm,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
    gap: Spacing.md,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLabel: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
});

