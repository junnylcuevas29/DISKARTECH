 import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { employerApplicants } from '@/data/employerApplicants';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ApplicantDetailsScreen() {
  const { id } = useLocalSearchParams();
  const applicant = employerApplicants.find((a) => a.id === id) || employerApplicants[0];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Applicant Details</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Avatar uri={applicant.avatar} name={applicant.name} size={80} />
          <Text style={styles.applicantName}>{applicant.name}</Text>
          <Text style={styles.applicantPosition}>{applicant.position} Applicant</Text>
          <View style={styles.matchBanner}>
            <View style={styles.matchBadge}>
              <Text style={styles.matchValue}>{applicant.matchScore}%</Text>
              <Text style={styles.matchLabel}>Match</Text>
            </View>
            <Badge text="Pending Review" variant="warning" />
          </View>
        </View>

        {/* Meta Information */}
        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <MaterialIcons name="location-on" size={20} color={Colors.primary} />
            <Text style={styles.metaLabel}>Distance</Text>
            <Text style={styles.metaValue}>{applicant.distance}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons name="star" size={20} color={Colors.warning} />
            <Text style={styles.metaLabel}>Rating</Text>
            <Text style={styles.metaValue}>{applicant.rating}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons name="schedule" size={20} color={Colors.success} />
            <Text style={styles.metaLabel}>Availability</Text>
            <Text style={[styles.metaValue, { fontSize: 11 }]}>{applicant.availability}</Text>
          </View>
        </View>

        {/* School Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>School Information</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="school" size={20} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>{applicant.school}</Text>
              <Text style={styles.infoValue}>{applicant.course}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="star" size={20} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Year Level</Text>
              <Text style={styles.infoValue}>{applicant.yearLevel}</Text>
            </View>
          </View>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsRow}>
            {applicant.skills.map((skill) => (
              <View key={skill} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Availability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={20} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Available Schedule</Text>
              <Text style={styles.infoValue}>{applicant.availability}</Text>
            </View>
          </View>
        </View>

        {/* Resume */}
        <TouchableOpacity style={styles.section}>
          <View style={styles.resumeRow}>
            <MaterialIcons name="description" size={24} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Resume</Text>
              <Text style={styles.infoValue}>{applicant.name.replace(' ', '_')}_Resume.pdf</Text>
            </View>
            <MaterialIcons name="download" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Actions */}
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
              style={{ marginBottom: Spacing.sm }}
            />
<PrimaryButton
              title="Message"
              onPress={() => router.push(`/common/chat?id=e${applicant.id}`)}
              variant="secondary"
              size="medium"
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
  matchBanner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.sm },
  matchBadge: {
    backgroundColor: Colors.success + '15', borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, alignItems: 'center',
  },
  matchValue: { ...Typography.bodySmall, color: Colors.success, fontWeight: '700' },
  matchLabel: { ...Typography.tag, fontSize: 9, color: Colors.success },
  metaGrid: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  metaItem: {
    flex: 1, backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    alignItems: 'center', ...Shadow.sm,
  },
  metaLabel: { ...Typography.tag, color: Colors.textLight, marginTop: 4 },
  metaValue: { ...Typography.bodySmall, color: Colors.text, fontWeight: '600', marginTop: 2, textAlign: 'center' },
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
  secondaryActions: { flexDirection: 'column' },
});
