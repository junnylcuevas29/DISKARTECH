import Chip from '@/components/ui/Chip';
import JobCard from '@/components/ui/JobCard';
import SearchBar from '@/components/ui/SearchBar';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { jobs } from '@/data/jobs';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const salaryFilters = ['₱50-₱75/hr', '₱75-₱100/hr', '₱100-₱150/hr', '₱150+/hr'];
const distanceFilters = ['< 1 km', '< 3 km', '< 5 km', 'Any'];
const scheduleFilters = ['Flexible', 'Morning', 'Evening', 'Midnight', 'Weekends'];

const locationFilters = ['Nearby', 'Barangay', '3km', '5km'];
const skillFilters = ['Cooking', 'Teaching', 'Computer', 'Sales'];
const jobCategoryFilters = ['Food Service', 'Retail', 'Tutor', 'Delivery', 'Freelance', 'Events', 'Household'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedJobCategory, setSelectedJobCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSkill = (skill: string) =>
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );

  const categoryMatch = (jobCategory: string): boolean => {
    if (!selectedJobCategory) return true;
    const map: Record<string, string[]> = {
      'Food Service': ['Food Service', 'Hospitality'],
      'Retail': ['Retail'],
      'Tutor': ['Tutoring'],
      'Delivery': ['Delivery'],
      'Freelance': ['Freelance'],
      'Events': ['Hospitality', 'Food Service'],
      'Household': ['Cleaning', 'Household'],
    };
    const aliases = map[selectedJobCategory];
    return aliases ? aliases.includes(jobCategory) : jobCategory === selectedJobCategory;
  };

  const filteredJobs = jobs.filter((j) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      j.jobTitle.toLowerCase().includes(q) ||
      j.companyName.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q);

    const matchesCategory = !selectedCategory || j.category === selectedCategory || (selectedCategory === 'All' ? true : false);
    const matchesLocation = !selectedLocation || true; // location filter applied via distance heuristics
    const matchesSchedule = !selectedSchedule ||
      (selectedSchedule === 'Weekends' ? j.schedule.toLowerCase().includes('weekend') : j.schedule.toLowerCase().includes(selectedSchedule.toLowerCase()));
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) =>
        j.skills.some((s) =>
          s.toLowerCase().includes(skill.toLowerCase()) ||
          (skill.toLowerCase() === 'computer' && s.toLowerCase().includes('computer')) ||
          (skill.toLowerCase() === 'sales' && (s.toLowerCase().includes('sales') || s.toLowerCase().includes('customer service'))) ||
          (skill.toLowerCase() === 'teaching' && (s.toLowerCase().includes('teaching') || s.toLowerCase().includes('tutor'))) ||
          (skill.toLowerCase() === 'cooking' && (s.toLowerCase().includes('cook') || s.toLowerCase().includes('barista') || s.toLowerCase().includes('coffee')))
        )
      );
    const matchesJobCategory = categoryMatch(j.category);

    return matchesQuery && matchesCategory && matchesLocation && matchesSchedule && matchesSkills && matchesJobCategory;
  });

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
        {['All', ...jobCategoryFilters.filter(c => c !== 'Household')].map(
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
          <Text style={styles.filterTitle}>Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {locationFilters.map((f) => (
              <Chip
                key={f}
                label={f}
                variant="outlined"
                selected={selectedLocation === f}
                onPress={() => setSelectedLocation(f === selectedLocation ? null : f)}
              />
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Schedule</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {scheduleFilters.map((f) => (
              <Chip
                key={f}
                label={f}
                variant="outlined"
                selected={selectedSchedule === f}
                onPress={() => setSelectedSchedule(f === selectedSchedule ? null : f)}
              />
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Skills</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {skillFilters.map((f) => (
              <Chip
                key={f}
                label={f}
                variant="outlined"
                selected={selectedSkills.includes(f)}
                onPress={() => toggleSkill(f)}
              />
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Job Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {jobCategoryFilters.map((f) => (
              <Chip
                key={f}
                label={f}
                variant="outlined"
                selected={selectedJobCategory === f}
                onPress={() => setSelectedJobCategory(f === selectedJobCategory ? null : f)}
              />
            ))}
          </ScrollView>

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
            onPress={() => router.push(`/student/job-details?id=${job.id}`)}
            onBookmark={() => {}}
            onApply={() => router.push(`/student/job-details?id=${job.id}`)}
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
