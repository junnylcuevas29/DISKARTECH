import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const stats = [
  { icon: 'work', label: 'Posted Jobs', value: '12', color: '#2196F3' },
  { icon: 'people', label: 'Applicants', value: '48', color: '#4CAF50' },
  { icon: 'rate-review', label: 'Pending Reviews', value: '6', color: '#FF9800' },
  { icon: 'check-circle', label: 'Hired', value: '8', color: '#D32F2F' },
];

const quickActions = [
  { icon: 'add-circle', label: 'Post a Job', color: '#D32F2F', route: '/job-posting' as const },
  { icon: 'people', label: 'Applicants', color: '#2196F3', route: '/applicant-details' as const },
  { icon: 'chat', label: 'Messages', color: '#4CAF50', route: '/chat' as const },
  { icon: 'verified', label: 'Verification', color: '#FF9800', route: '/verification-status' as const },
];

const recentApplications = [
  { name: 'Junnyl Mabini', position: 'Service Crew', status: 'pending' as const, avatar: '' },
  { name: 'Ana Santos', position: 'Barista', status: 'accepted' as const, avatar: '' },
  { name: 'Carlos Reyes', position: 'Sales Associate', status: 'pending' as const, avatar: '' },
  { name: 'Maria Santos', position: 'Cashier', status: 'rejected' as const, avatar: '' },
];

const postedJobs = [
  { title: 'Service Crew', applicants: 15, status: 'active' as const, salary: '₱75 - ₱95/hr' },
  { title: 'Barista', applicants: 28, status: 'active' as const, salary: '₱80 - ₱100/hr' },
  { title: 'Cashier', applicants: 12, status: 'active' as const, salary: '₱70 - ₱85/hr' },
  { title: 'Service Crew (Night)', applicants: 8, status: 'closed' as const, salary: '₱85 - ₱110/hr' },
];

export default function EmployerDashboardScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning! 👋</Text>
            <Text style={styles.businessName}>McDonald's SM North</Text>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={14} color={Colors.verified} />
              <Text style={styles.verifiedText}>Verified Business</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/notifications')}>
            <View style={styles.notifBadge}>
              <Avatar uri="" name="MD" size={48} />
              <View style={styles.notifDot} />
            </View>
          </TouchableOpacity>
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

        {/* Recent Applications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Applications</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentApplications.map((app, index) => (
            <TouchableOpacity
              key={index}
              style={styles.appCard}
              onPress={() => router.push('/applicant-details')}
            >
              <Avatar uri={app.avatar} name={app.name} size={44} />
              <View style={styles.appInfo}>
                <Text style={styles.appName}>{app.name}</Text>
                <Text style={styles.appPosition}>{app.position}</Text>
              </View>
              <Badge
                text={app.status === 'pending' ? 'Pending' : app.status === 'accepted' ? 'Accepted' : 'Rejected'}
                variant={app.status === 'pending' ? 'warning' : app.status === 'accepted' ? 'success' : 'error'}
              />
              <MaterialIcons name="chevron-right" size={20} color={Colors.gray400} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Posted Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Posted Jobs</Text>
              <Text style={styles.sectionSubtitle}>Manage your job listings</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/job-posting')}>
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
                />
                <Text style={styles.applicantCount}>{job.applicants} applicants</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Performance Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Overview</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View Report</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.performanceRow}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>85%</Text>
              <Text style={styles.performanceLabel}>Application Rate</Text>
            </View>
            <View style={styles.performanceDivider} />
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>3.2</Text>
              <Text style={styles.performanceLabel}>Avg. Rating</Text>
            </View>
            <View style={styles.performanceDivider} />
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>7</Text>
              <Text style={styles.performanceLabel}>Hired This Month</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutSection}
          onPress={() => router.push('/auth/welcome')}
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

        {/* Bottom padding */}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingTop: Spacing.xl, marginBottom: Spacing.xl,
  },
  greeting: { ...Typography.h4, color: Colors.text },
  businessName: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4,
  },
  verifiedText: { ...Typography.caption, color: Colors.verified, fontWeight: '600' },
  notifBadge: { position: 'relative' },
  notifDot: {
    position: 'absolute', top: 2, right: 2, width: 10, height: 10, borderRadius: 5,
    backgroundColor: Colors.primary, borderWidth: 2, borderColor: Colors.background,
  },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg,
  },
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
  sectionTitleHeader: {
    ...Typography.h5, color: Colors.text, marginBottom: Spacing.md,
  },
  quickActions: {
    flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg,
  },
  actionCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.md, alignItems: 'center', ...Shadow.sm,
  },
  actionIcon: {
    width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  actionLabel: {
    ...Typography.caption, color: Colors.text, fontWeight: '600', textAlign: 'center',
  },
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
  appInfo: { flex: 1 },
  appName: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  appPosition: { ...Typography.caption, color: Colors.textSecondary },
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
  performanceRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm,
  },
  performanceItem: { flex: 1, alignItems: 'center' },
  performanceValue: { ...Typography.h4, color: Colors.primary },
  performanceLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 4, textAlign: 'center' },
  performanceDivider: {
    width: 1, height: 40, backgroundColor: Colors.gray200,
  },
  logoutSection: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.error + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  logoutTextWrap: {
    flex: 1,
  },
  logoutLabel: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.error,
  },
  logoutDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
