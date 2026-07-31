import Badge from '@/components/ui/Badge';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { jobs } from '@/data/jobs';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <View style={styles.container}>
        <Text>Job not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.bannerContent}>
            <View style={styles.bannerLogo}>
              <View style={styles.bannerLogoPlaceholder}>
                <Text style={styles.bannerLogoText}>{job.companyName.charAt(0)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.jobHeader}>
            <View style={styles.jobHeaderLeft}>
              <Text style={styles.jobTitle}>{job.jobTitle}</Text>
              <View style={styles.companyRow}>
                <Text style={styles.companyName}>{job.companyName}</Text>
                {job.verified && (
                  <MaterialIcons name="verified" size={18} color={Colors.verified} />
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.bookmarkBtn}>
              <MaterialIcons
                name={job.bookmarked ? 'bookmark' : 'bookmark-border'}
                size={28}
                color={job.bookmarked ? Colors.bookmark : Colors.gray400}
              />
            </TouchableOpacity>
          </View>

          {/* Salary & Info */}
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <MaterialIcons name="attach-money" size={20} color={Colors.primary} />
              <Text style={styles.infoLabel}>Salary</Text>
              <Text style={styles.infoValue}>{job.salary}</Text>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="location-on" size={20} color={Colors.primary} />
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{job.location}</Text>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="schedule" size={20} color={Colors.primary} />
              <Text style={styles.infoLabel}>Schedule</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{job.workingHours}</Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            <Badge text={job.jobType} variant="info" />
            <Badge text={job.category} variant="default" />
            <Badge text={job.schedule} variant="warning" />
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Description</Text>
            <Text style={styles.sectionText}>{job.description}</Text>
          </View>

          {/* Requirements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            {job.requirements.map((req, index) => (
              <View key={index} style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>{req}</Text>
              </View>
            ))}
          </View>

          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills Needed</Text>
            <View style={styles.skillsRow}>
              {job.skills.map((skill) => (
                <View key={skill} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            {job.benefits.map((benefit, index) => (
              <View key={index} style={styles.bulletItem}>
                <MaterialIcons name="check-circle" size={18} color={Colors.success} />
                <Text style={styles.bulletText}>{benefit}</Text>
              </View>
            ))}
          </View>

          {/* Employer Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the Employer</Text>
            <View style={styles.employerCard}>
              <View style={styles.employerInfo}>
                <Text style={styles.employerName}>{job.employerInfo.name}</Text>
                <Text style={styles.employerDetail}>{job.employerInfo.email}</Text>
                <Text style={styles.employerDetail}>{job.employerInfo.phone}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.salaryInfo}>
          <Text style={styles.salaryInfoLabel}>Salary</Text>
          <Text style={styles.salaryInfoValue}>{job.salary}</Text>
        </View>
        <PrimaryButton
          title="Apply Now"
          onPress={() => {}}
          size="medium"
          style={{ flex: 1, marginLeft: Spacing.md }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  banner: {
    height: 200,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
    paddingTop: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  bannerLogoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerLogoText: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
  },
  content: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  jobHeaderLeft: {
    flex: 1,
    marginRight: Spacing.md,
  },
  jobTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  companyName: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  bookmarkBtn: {
    padding: Spacing.sm,
  },
  infoCards: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  infoCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadow.sm,
  },
  infoLabel: {
    ...Typography.caption,
    color: Colors.textLight,
    marginTop: 4,
  },
  infoValue: {
    ...Typography.caption,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginTop: 2,
    fontSize: 11,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  sectionText: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
  },
  bulletText: {
    ...Typography.body,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
  skillsRow: {
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
  employerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  employerInfo: {
    flex: 1,
  },
  employerName: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  employerDetail: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
  },
  salaryInfo: {
    marginRight: Spacing.sm,
  },
  salaryInfoLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  salaryInfoValue: {
    ...Typography.h5,
    color: Colors.primary,
  },
});

