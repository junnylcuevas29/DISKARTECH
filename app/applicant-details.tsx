import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ApplicantDetailsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Applicant Details</Text>
        </View>

        <View style={styles.profileCard}>
          <Avatar uri="" name="Junnyl Mabini" size={80} />
          <Text style={styles.applicantName}>Junnyl Mabini</Text>
          <Text style={styles.applicantPosition}>Service Crew Applicant</Text>
          <Badge text="Pending Review" variant="warning" />
        </View>

<View style={styles.section}>
          <Text style={styles.sectionTitle}>School Information</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="school" size={20} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>University of Santo Tomas</Text>
              <Text style={styles.infoValue}>BS Information Technology</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="star" size={20} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Year Level</Text>
              <Text style={styles.infoValue}>3rd Year</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsRow}>
            {['Customer Service', 'Communication', 'Teamwork', 'Time Management', 'Adaptability'].map((skill) => (
              <View key={skill} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={20} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Available Schedule</Text>
              <Text style={styles.infoValue}>Weekdays (After 3PM), Weekends (Full Day)</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.section}>
          <View style={styles.resumeRow}>
            <MaterialIcons name="description" size={24} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Resume</Text>
              <Text style={styles.infoValue}>Junnyl_Mabini_Resume.pdf</Text>
            </View>
            <MaterialIcons name="download" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          <PrimaryButton
            title="Accept Application"
            onPress={() => {}}
            variant="primary"
            size="medium"
            style={{ marginBottom: Spacing.sm }}
            icon={<MaterialIcons name="check-circle" size={20} color={Colors.white} />}
          />
          <View style={styles.secondaryActions}>
            <PrimaryButton
              title="Reject"
              onPress={() => {}}
              variant="outline"
              size="medium"
              style={{ flex: 1, marginRight: Spacing.sm }}
            />
<PrimaryButton
              title="Message"
              onPress={() => router.push('/chat')}
              variant="secondary"
              size="medium"
              style={{ flex: 1 }}
              icon={<MaterialIcons name="message" size={20} color={Colors.primary} />}
            />
          </View>
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
  profileCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.xl,
    alignItems: 'center', ...Shadow.md, marginBottom: Spacing.md,
  },
  applicantName: { ...Typography.h4, color: Colors.text, marginTop: Spacing.md },
  applicantPosition: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 4, marginBottom: Spacing.sm },
  section: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, ...Shadow.sm,
  },
  sectionTitle: { ...Typography.h5, color: Colors.text, marginBottom: Spacing.md },
  infoRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  infoContent: { flex: 1 },
  infoLabel: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  infoValue: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  skillTag: {
    backgroundColor: Colors.primary + '10', paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm, borderRadius: BorderRadius.full,
  },
  skillText: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '500' },
  resumeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  actionButtons: { marginTop: Spacing.md },
  secondaryActions: { flexDirection: 'row' },
});
