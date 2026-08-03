import BurgerMenu from '@/components/ui/BurgerMenu';
import CategoryCard from '@/components/ui/CategoryCard';
import JobCard from '@/components/ui/JobCard';
import SearchBar from '@/components/ui/SearchBar';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { categories, emergencyJobs, featuredJobs, nearbyJobs, recommendedJobs } from '@/data/jobs';
import { computeProfileCompletion, getFullName, registerStudentData } from '@/data/studentProfile';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const smartAlerts = [
  {
    icon: 'work',
    title: 'New Job Available',
    subtitle: '2km away',
    badge: 'Matches your schedule',
    color: Colors.info,
    bg: Colors.info + '15',
  },
  {
    icon: 'event-available',
    title: 'Interview Tomorrow',
    subtitle: "McDonald's SM North • 2:00 PM",
    badge: 'Upcoming',
    color: Colors.warning,
    bg: Colors.warning + '15',
  },
  {
    icon: 'check-circle',
    title: 'Application Accepted 🎉',
    subtitle: 'Starbucks Barista position',
    badge: '2 hours ago',
    color: Colors.success,
    bg: Colors.success + '15',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const profileCompletion = computeProfileCompletion(registerStudentData);

  const handleJobPress = (jobId: string) => {
    router.push(`/student/job-details?id=${jobId}`);
  };

  const renderHeader = () => (
    <View>
      {/* Greeting */}
      <View style={styles.greetingSection}>
        <View style={styles.greetingLeft}>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.burgerBtn}>
            <MaterialIcons name="menu" size={26} color={Colors.white} />
          </TouchableOpacity>
          <View>
            <Text style={styles.greetingText}>Hello, {getFullName(registerStudentData).split(' ')[0]} 👋</Text>
            <Text style={styles.greetingSubtext}>Find your perfect student job today!</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/common/notifications')}>
          <View style={styles.notifBadge}>
            <MaterialIcons name="notifications" size={24} color={Colors.text} />
            <View style={styles.notifDot} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} onFilter={() => router.push('/student/(tabs)/search')} />
      </View>

      {/* Profile Completion */}
      <View style={styles.completionCard}>
        <View style={styles.completionLeft}>
          <View style={styles.completionRing}>
            <Text style={styles.completionPercent}>{profileCompletion}%</Text>
            <Text style={styles.completionLabel}>Complete</Text>
          </View>
          <View style={styles.completionInfo}>
            <Text style={styles.completionTitle}>Profile {profileCompletion}% Complete</Text>
            <Text style={styles.completionHint}>Complete your profile to get more job matches!</Text>
          </View>
        </View>
        <View style={styles.completionActions}>
          <TouchableOpacity style={styles.completionAction} onPress={() => router.push('/student/edit-profile')}>
            <MaterialIcons name="upload-file" size={16} color={Colors.primary} />
            <Text style={styles.completionActionText}>Upload Resume</Text>
            <Text style={styles.completionActionPlus}>+10%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.completionAction} onPress={() => router.push('/student/edit-profile')}>
            <MaterialIcons name="handyman" size={16} color={Colors.primary} />
            <Text style={styles.completionActionText}>Add Skills</Text>
            <Text style={styles.completionActionPlus}>+5%</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Expense Motivation Tracker */}
      <View style={styles.expenseCard}>
        <View style={styles.expenseHeader}>
          <View style={styles.expenseTitleRow}>
            <View style={styles.expenseIconWrap}>
              <MaterialIcons name="savings" size={20} color={Colors.warning} />
            </View>
            <Text style={styles.expenseTitle}>Expense Motivation Tracker</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.expenseSeeAll}>Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.expenseGoalRow}>
          <View style={styles.expenseGoalItem}>
            <Text style={styles.expenseGoalLabel}>Goal</Text>
            <Text style={styles.expenseGoalValue}>Tuition Fee</Text>
          </View>
          <View style={styles.expenseGoalItem}>
            <Text style={styles.expenseGoalLabel}>Amount</Text>
            <Text style={styles.expenseGoalValue}>₱10,000</Text>
          </View>
          <View style={styles.expenseGoalItem}>
            <Text style={styles.expenseGoalLabel}>Saved</Text>
            <Text style={styles.expenseGoalValueGreen}>₱3,000</Text>
          </View>
        </View>
        <View style={styles.expenseProgressTrack}>
          <View style={[styles.expenseProgressFill, { width: '30%' }]} />
        </View>
        <View style={styles.expenseProgressRow}>
          <Text style={styles.expenseProgressText}>Progress: 30%</Text>
          <Text style={styles.expenseProgressTextLight}>₱7,000 to go!</Text>
        </View>
      </View>

      {/* Smart Alerts */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Smart Alerts</Text>
        <TouchableOpacity onPress={() => router.push('/common/notifications')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {smartAlerts.map((alert) => (
        <TouchableOpacity key={alert.title} style={styles.alertCard} activeOpacity={0.8}>
          <View style={[styles.alertIconWrap, { backgroundColor: alert.bg }]}>
            <MaterialIcons name={alert.icon as any} size={22} color={alert.color} />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>{alert.title}</Text>
            <Text style={styles.alertSubtitle}>{alert.subtitle}</Text>
          </View>
          <View style={styles.alertRight}>
            <Text style={styles.alertBadge}>{alert.badge}</Text>
            <MaterialIcons name="chevron-right" size={20} color={Colors.gray400} />
          </View>
        </TouchableOpacity>
      ))}

      {/* AI Job Recommendation */}
      <View style={styles.aiHeader}>
        <View style={styles.aiTitleRow}>
          <View style={styles.aiIconWrap}>
            <MaterialIcons name="auto-awesome" size={20} color={Colors.white} />
          </View>
          <Text style={styles.aiTitle}>AI Job Recommendations</Text>
        </View>
        <Text style={styles.aiSubtitle}>Personalized for your skills & schedule</Text>
      </View>
      {recommendedJobs.slice(0, 2).map((job) => {
        const matchScore = job.id === '5' ? 95 : 92;
        return (
          <View key={job.id} style={styles.matchCard}>
            <View style={styles.matchCardTop}>
              <JobCard job={job} variant="featured" onPress={() => handleJobPress(job.id)} onBookmark={() => {}} onApply={() => router.push(`/student/job-details?id=${job.id}`)} />
            </View>
            <View style={styles.matchScoreWrap}>
              <Text style={styles.matchScoreLabel}>Match Score</Text>
              <Text style={styles.matchScoreValue}>{matchScore}%</Text>
            </View>
          </View>
        );
      })}

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity onPress={() => router.push('/student/(tabs)/search')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard
            name={item.name}
            icon={item.icon as any}
            count={item.count}
            color={item.color}
            onPress={() => router.push('/student/(tabs)/search')}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />

      {/* Featured Jobs */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Jobs</Text>
        <TouchableOpacity onPress={() => router.push('/student/(tabs)/search')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {featuredJobs.slice(0, 3).map((job) => (
        <JobCard
          key={job.id}
          job={job}
          variant="featured"
          onPress={() => handleJobPress(job.id)}
          onBookmark={() => {}}
          onApply={() => router.push(`/student/job-details?id=${job.id}`)}
        />
      ))}

      {/* Emergency Jobs */}
      <View style={styles.emergencyHeader}>
        <View style={styles.emergencyIconWrap}>
          <MaterialIcons name="sos" size={20} color={Colors.white} />
        </View>
        <View style={styles.emergencyTitleWrap}>
          <Text style={styles.emergencyTitle}>Emergency Jobs</Text>
          <Text style={styles.emergencySubtitle}>Urgent hiring right now</Text>
        </View>
      </View>
      {emergencyJobs.slice(0, 2).map((job) => (
        <JobCard
          key={job.id}
          job={job}
          variant="featured"
          onPress={() => handleJobPress(job.id)}
          onBookmark={() => {}}
          onApply={() => router.push(`/student/job-details?id=${job.id}`)}
        />
      ))}

      {/* Nearby Jobs */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Jobs</Text>
        <TouchableOpacity onPress={() => router.push('/student/(tabs)/search')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {nearbyJobs.map((job) => (
        <JobCard key={job.id} job={job} variant="compact" onPress={() => handleJobPress(job.id)} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
      </ScrollView>
      <BurgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.md,
  },
  greetingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  greetingText: {
    ...Typography.h3,
    color: Colors.text,
  },
  greetingSubtext: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  burgerBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  notifBadge: {
    position: 'relative',
    padding: Spacing.sm,
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    borderWidth: 1.5,
    borderColor: Colors.background,
  },
  searchSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.text,
  },
  seeAll: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  categoriesList: {
    paddingLeft: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  // Profile Completion
  completionCard: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    ...Shadow.md,
    marginBottom: Spacing.md,
  },
  completionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  completionRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 3,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionPercent: {
    ...Typography.h5,
    color: Colors.white,
    fontWeight: '700',
  },
  completionLabel: {
    ...Typography.tag,
    color: 'rgba(255,255,255,0.9)',
  },
  completionInfo: {
    flex: 1,
  },
  completionTitle: {
    ...Typography.h5,
    color: Colors.white,
    fontWeight: '700',
  },
  completionHint: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    lineHeight: 16,
  },
  completionActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  completionAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
  },
  completionActionText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: '600',
  },
  completionActionPlus: {
    ...Typography.tag,
    color: Colors.success,
    fontWeight: '700',
  },
  // Expense Tracker
  expenseCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.md,
    marginBottom: Spacing.md,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  expenseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  expenseIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.warning + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseTitle: {
    ...Typography.h5,
    color: Colors.text,
  },
  expenseSeeAll: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  expenseGoalRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  expenseGoalItem: {
    flex: 1,
  },
  expenseGoalLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  expenseGoalValue: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '600',
    marginTop: 2,
  },
  expenseGoalValueGreen: {
    ...Typography.bodySmall,
    color: Colors.success,
    fontWeight: '700',
    marginTop: 2,
  },
  expenseProgressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray200,
    overflow: 'hidden',
  },
  expenseProgressFill: {
    height: '100%',
    backgroundColor: Colors.warning,
    borderRadius: 4,
  },
  expenseProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  expenseProgressText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: '600',
  },
  expenseProgressTextLight: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  // Smart Alerts
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    gap: Spacing.md,
  },
  alertIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '600',
  },
  alertSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  alertRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  alertBadge: {
    ...Typography.tag,
    color: Colors.primary,
    fontWeight: '600',
  },
  // AI Recommendations
  aiHeader: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  aiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  aiIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTitle: {
    ...Typography.h5,
    color: Colors.text,
  },
  aiSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  matchCard: {
    marginHorizontal: Spacing.lg,
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  matchCardTop: {
    marginBottom: -8,
  },
  matchScoreWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    ...Shadow.sm,
    alignItems: 'center',
  },
  matchScoreLabel: {
    ...Typography.tag,
    color: Colors.textLight,
    fontSize: 9,
  },
  matchScoreValue: {
    ...Typography.buttonSmall,
    color: Colors.success,
    fontWeight: '700',
  },
  // Emergency
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emergencyIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyTitleWrap: {
    flex: 1,
  },
  emergencyTitle: {
    ...Typography.h5,
    color: Colors.error,
    fontWeight: '700',
  },
  emergencySubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
