import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography, BorderRadius, Shadow, Spacing } from '@/constants/typography';
import JobCard from '@/components/ui/JobCard';
import CategoryCard from '@/components/ui/CategoryCard';
import SearchBar from '@/components/ui/SearchBar';
import Avatar from '@/components/ui/Avatar';
import { jobs, categories, featuredJobs, nearbyJobs, recommendedJobs, recentJobs } from '@/data/jobs';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleJobPress = (jobId: string) => {
    router.push(`/job-details?id=${jobId}`);
  };

  const renderHeader = () => (
    <View>
      {/* Greeting */}
      <View style={styles.greetingSection}>
        <View>
          <Text style={styles.greetingText}>Hello, Junnyl 👋</Text>
          <Text style={styles.greetingSubtext}>Find your perfect student job today!</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <View style={styles.notifBadge}>
            <MaterialIcons name="notifications" size={24} color={Colors.text} />
            <View style={styles.notifDot} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilter={() => {}}
        />
      </View>

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity>
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
            onPress={() => {}}
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
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[]}
      >
        {renderHeader()}

        {featuredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            variant="featured"
            onPress={() => handleJobPress(job.id)}
            onBookmark={() => {}}
            onApply={() => router.push(`/job-details?id=${job.id}`)}
          />
        ))}

        {/* Nearby Jobs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Jobs</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {nearbyJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            variant="compact"
            onPress={() => handleJobPress(job.id)}
          />
        ))}

        {/* Recommended Jobs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {recommendedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onPress={() => handleJobPress(job.id)}
            onBookmark={() => {}}
            onApply={() => router.push(`/job-details?id=${job.id}`)}
          />
        ))}

        {/* Recent Jobs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Jobs</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {recentJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            variant="compact"
            onPress={() => handleJobPress(job.id)}
          />
        ))}
      </ScrollView>
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
  greetingText: {
    ...Typography.h3,
    color: Colors.text,
  },
  greetingSubtext: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
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
});

