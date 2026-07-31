import Chip from '@/components/ui/Chip';
import JobCard from '@/components/ui/JobCard';
import SearchBar from '@/components/ui/SearchBar';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { jobs } from '@/data/jobs';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const salaryFilters = ['₱50-₱75/hr', '₱75-₱100/hr', '₱100-₱150/hr', '₱150+/hr'];
const distanceFilters = ['< 1 km', '< 3 km', '< 5 km', 'Any'];
const scheduleFilters = ['Flexible', 'Morning', 'Evening', 'Midnight', 'Weekends'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = searchQuery
    ? jobs.filter(
        (j) =>
          j.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : jobs;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Jobs</Text>
      </View>

      <View style={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilter={() => setShowFilters(!showFilters)}
        />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
        contentContainerStyle={styles.categoriesContent}
      >
        {['All', 'Food Service', 'Retail', 'Tutoring', 'Delivery', 'Admin', 'Freelance'].map(
          (cat) => (
            <Chip
              key={cat}
              label={cat}
              selected={selectedCategory === cat || (cat === 'All' && !selectedCategory)}
              onPress={() => setSelectedCategory(cat === 'All' ? null : cat)}
            />
          )
        )}
      </ScrollView>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          <Text style={styles.filterTitle}>Salary Range</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {salaryFilters.map((f) => (
              <Chip key={f} label={f} variant="outlined" />
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Distance</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {distanceFilters.map((f) => (
              <Chip key={f} label={f} variant="outlined" />
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Schedule</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {scheduleFilters.map((f) => (
              <Chip key={f} label={f} variant="outlined" />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Results */}
      <ScrollView
        style={styles.results}
        contentContainerStyle={styles.resultsContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.resultCount}>{filteredJobs.length} jobs found</Text>
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onPress={() => router.push(`/job-details?id=${job.id}`)}
            onBookmark={() => {}}
            onApply={() => router.push(`/job-details?id=${job.id}`)}
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
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  searchSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  categories: {
    maxHeight: 48,
    marginBottom: Spacing.sm,
  },
  categoriesContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filtersPanel: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  filterTitle: {
    ...Typography.label,
    color: Colors.text,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  filterRow: {
    marginBottom: Spacing.sm,
  },
  results: {
    flex: 1,
  },
  resultsContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  resultCount: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
});

