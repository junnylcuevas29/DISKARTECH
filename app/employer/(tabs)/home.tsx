import Badge from '@/components/ui/Badge';
import EmployerBurgerMenu from '@/components/ui/EmployerBurgerMenu';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { employerApplicants } from '@/data/employerApplicants';
import { registerEmployerData } from '@/data/employerProfile';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const stats = [
  { icon: 'work', label: 'Active Jobs', value: '12', color: '#2196F3' },
  { icon: 'people', label: 'Applicants', value: '48', color: '#4CAF50' },
  { icon: 'group', label: 'Accepted Workers', value: '8', color: '#FF9800' },
  { icon: 'check-circle', label: 'Completed Jobs', value: '23', color: '#D32F2F' },
];

const quickActions = [
  { icon: 'add-circle', label: 'Post a Job', color: '#D32F2F', route: '/employer/job-posting' as const },
  { icon: 'people', label: 'Applicants', color: '#2196F3', route: '/employer/(tabs)/applicants' as const },
  { icon: 'chat', label: 'Messages', color: '#4CAF50', route: '/employer/(tabs)/messages' as const },
  { icon: 'verified', label: 'Verification', color: '#FF9800', route: '/employer/verification-status' as const },
];

const postedJobs = [
  { title: 'Service Crew', applicants: 15, status: 'active' as const, salary: '₱75 - ₱95/hr' },
  { title: 'Barista', applicants: 28, status: 'active' as const, salary: '₱80 - ₱100/hr' },
  { title: 'Tutor', applicants: 32, status: 'active' as const, salary: '₱120 - ₱200/hr' },
  { title: 'Cashier', applicants: 12, status: 'closed' as const, salary: '₱70 - ₱85/hr' },
];

export default function EmployerHomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  const topCandidate = employerApplicants.find((a) => a.id === '5')!;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.burgerBtn}>
              <MaterialIcons name="menu" size={26} color={Colors.white} />
            </TouchableOpacity>
            <View>
              <Text style={styles.greeting}>Good Morning! 👋</Text>
              <Text style={styles.businessName}>{registerEmployerData.businessName}</Text>
              <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={14} color={Colors.verified} />
                <Text style={styles.verifiedText}>Verified Business</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/common/notifications')}>
            <View style={styles.notifBadge}>
              <MaterialIcons name="notifications" size={24} color={Colors.text} />
              <View style={styles.notifDot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Overall Rating banner */}
        <View style={styles.ratingBanner}>
          <View style={styles.ratingLeft}>
            <Text style={styles.ratingValue}>4.7</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <MaterialIcons key={i} name="star" size={16} color={Colors.warning} />
              ))}
            </View>
            <Text style={styles.ratingLabel}>24 reviews from students</Text>
          </View>
          <View style={styles.ratingDivider} />
          <View style={styles.ratingRight}>
            <Text style={styles.ratingTitle}>Employer Rating</Text>
            <Text style={styles.ratingSubtitle}>Payment • Communication • Work Condition</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <MaterialIcons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* AI Workforce Recommendation */}
        <View style={styles.aiHeader}>
          <View style={styles.aiTitleRow}>
            <View style={styles.aiIconWrap}>
              <MaterialIcons name="auto-awesome" size={20} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.aiTitle}>AI Workforce Recommendation</Text>
              <Text style={styles.aiSubtitle}>Top candidate for your latest job post</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.aiCard}
          onPress={() => router.push('/employer/applicant-details')}
          activeOpacity={0.8}
        >
          <View style={styles.aiTopRow}>
            <View style={styles.aiAvatar}>
              <Text style={styles.aiAvatarText}>
                {topCandidate.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </Text>
            </View>
            <View style={styles.aiInfo}>
              <Text style={styles.aiName}>{topCandidate.name}</Text>
              <Text style={styles.aiPosition}>Tutor • 6PM-8PM</Text>
            </View>
            <View style={styles.matchBadge}>
              <Text style={styles.matchValue}>{topCandidate.matchScore}%</Text>
              <Text style={styles.matchLabel}>Match</Text>
            </View>
          </View>
          <View style={styles.aiMetaRow}>
            <View style={styles.aiMetaItem}>
              <MaterialIcons name="location-on" size={14} color={Colors.textSecondary} />
              <Text style={styles.aiMetaText}>{topCandidate.distance}</Text>
            </View>
            <View style={styles.aiMetaItem}>
              <MaterialIcons name="schedule" size={14} color={Colors.textSecondary} />
              <Text style={styles.aiMetaText}>{topCandidate.availability}</Text>
            </View>
            <View style={styles.aiMetaItem}>
              <MaterialIcons name="star" size={14} color={Colors.textSecondary} />
              <Text style={styles.aiMetaText}>{topCandidate.rating} rating</Text>
            </View>
          </View>
          <View style={styles.aiSkillsRow}>
            {topCandidate.skills.slice(0, 3).map((s) => (
              <View key={s} style={styles.aiSkillTag}>
                <Text style={styles.aiSkillText}>{s}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitleHeader}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => router.push(action.route)}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                <MaterialIcons name={action.icon as any} size={28} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Applicants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Applicants</Text>
            <TouchableOpacity onPress={() => router.push('/employer/(tabs)/applicants')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {employerApplicants.slice(0, 3).map((app) => (
            <TouchableOpacity
              key={app.id}
              style={styles.appCard}
              onPress={() => router.push('/employer/applicant-details')}
            >
              <View style={styles.appAvatar}>
                <Text style={styles.appAvatarText}>
                  {app.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </Text>
              </View>
              <View style={styles.appInfo}>
                <Text style={styles.appName}>{app.name}</Text>
                <Text style={styles.appPosition}>{app.position}</Text>
              </View>
              <View style={styles.appMatch}>
                <Text style={styles.appMatchValue}>{app.matchScore}%</Text>
                <Text style={styles.appMatchLabel}>match</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={Colors.gray400} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Posted Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Active Job Posts</Text>
              <Text style={styles.sectionSubtitle}>Manage your job listings</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/employer/job-posting')}>
              <View style={styles.addJobBtn}>
                <MaterialIcons name="add" size={18} color={Colors.white} />
                <Text style={styles.addJobBtnText}>New</Text>
              </View>
            </TouchableOpacity>
          </View>
          {postedJobs.map((job, index) => (
            <TouchableOpacity key={index} style={styles.jobRow}>
              <View style={styles.jobRowLeft}>
                <View style={styles.jobIconContainer}>
                  <MaterialIcons name="work" size={20} color={Colors.primary} />
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobRowTitle}>{job.title}</Text>
                  <Text style={styles.jobSalary}>{job.salary}</Text>
                </View>
              </View>
              <View style={styles.jobRowRight}>
                <Badge
                  text={job.status === 'active' ? 'Active' : 'Closed'}
                  variant={job.status === 'active' ? 'success' : 'error'}
                  size="small"
                />
                <Text style={styles.applicantCount}>{job.applicants} applicants</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom padding */}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
      <EmployerBurgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingTop: Spacing.xl, marginBottom: Spacing.md,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  burgerBtn: {
    width: 44, height: 44, borderRadius: BorderRadius.md, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', ...Shadow.sm,
  },
  greeting: { ...Typography.h4, color: Colors.text },
  businessName: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  verifiedText: { ...Typography.caption, color: Colors.verified, fontWeight: '600' },
  notifBadge: { position: 'relative', padding: Spacing.sm },
  notifDot: {
    position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4,
    backgroundColor: Colors.primary, borderWidth: 1.5, borderColor: Colors.background,
  },
  ratingBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl, padding: Spacing.lg, ...Shadow.md, marginBottom: Spacing.md,
  },
  ratingLeft: { alignItems: 'center', paddingRight: Spacing.lg },
  ratingValue: { ...Typography.h2, color: Colors.white, fontWeight: '700' },
  starsRow: { flexDirection: 'row', marginTop: 2 },
  ratingLabel: { ...Typography.caption, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  ratingDivider: { width: 1, height: 56, backgroundColor: 'rgba(255,255,255,0.3)', marginRight: Spacing.lg },
  ratingRight: { flex: 1 },
  ratingTitle: { ...Typography.h5, color: Colors.white, fontWeight: '700' },
  ratingSubtitle: { ...Typography.caption, color: 'rgba(255,255,255,0.85)', marginTop: 4, lineHeight: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg },
  statCard: {
    width: '48%', backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.md, ...Shadow.sm, marginBottom: Spacing.sm,
  },
  statIcon: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: { ...Typography.h3, color: Colors.text },
  statLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  aiHeader: { marginTop: Spacing.sm, marginBottom: Spacing.sm },
  aiTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  aiIconWrap: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  aiTitle: { ...Typography.h5, color: Colors.text },
  aiSubtitle: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  aiCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    ...Shadow.md, marginBottom: Spacing.lg,
  },
  aiTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  aiAvatar: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  aiAvatarText: { ...Typography.h5, color: Colors.primary, fontWeight: '700' },
  aiInfo: { flex: 1 },
  aiName: { ...Typography.bodySmall, fontWeight: '700', color: Colors.text },
  aiPosition: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  matchBadge: {
    backgroundColor: Colors.success + '15', borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, alignItems: 'center',
  },
  matchValue: { ...Typography.h5, color: Colors.success, fontWeight: '700' },
  matchLabel: { ...Typography.tag, color: Colors.success },
  aiMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.md },
  aiMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  aiMetaText: { ...Typography.caption, color: Colors.textSecondary },
  aiSkillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  aiSkillTag: {
    backgroundColor: Colors.primary + '10', paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm, borderRadius: BorderRadius.full,
  },
  aiSkillText: { ...Typography.caption, color: Colors.primary, fontWeight: '500' },
  sectionTitleHeader: { ...Typography.h5, color: Colors.text, marginBottom: Spacing.md },
  quickActions: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  actionCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.md, alignItems: 'center', ...Shadow.sm,
  },
  actionIcon: {
    width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  actionLabel: { ...Typography.caption, color: Colors.text, fontWeight: '600', textAlign: 'center' },
  section: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, ...Shadow.sm,
  },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: Spacing.md, paddingBottom: Spacing.sm, borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  sectionTitle: { ...Typography.h5, color: Colors.text },
  sectionSubtitle: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  seeAll: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '600' },
  appCard: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, gap: Spacing.md,
  },
  appAvatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  appAvatarText: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '700' },
  appInfo: { flex: 1 },
  appName: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  appPosition: { ...Typography.caption, color: Colors.textSecondary },
  appMatch: { alignItems: 'center' },
  appMatchValue: { ...Typography.bodySmall, color: Colors.success, fontWeight: '700' },
  appMatchLabel: { ...Typography.tag, color: Colors.textLight },
  addJobBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.primary, paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm, borderRadius: BorderRadius.full,
  },
  addJobBtnText: { ...Typography.buttonSmall, color: Colors.white },
  jobRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.gray100,
  },
  jobRowLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flex: 1 },
  jobIconContainer: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.primary + '10',
    alignItems: 'center', justifyContent: 'center',
  },
  jobInfo: { flex: 1 },
  jobRowTitle: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  jobSalary: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  jobRowRight: { alignItems: 'flex-end', gap: 4 },
  applicantCount: { ...Typography.caption, color: Colors.textSecondary },
});
