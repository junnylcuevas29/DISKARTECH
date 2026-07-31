import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const defaultSchedule = days.map((day) => ({
  day,
  jobs: [
    { id: '1', title: 'Service Crew', time: '4:00 PM - 8:00 PM', company: "McDonald's" },
  ],
  hasConflict: day === 'Wednesday',
}));

export default function ScheduleScreen() {
  const [schedule] = useState(defaultSchedule);
  const [conflictResolved, setConflictResolved] = useState(false);

  const handleConflict = (resolve: boolean) => {
    setConflictResolved(resolve);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>My Schedule</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {schedule.map((day) => (
          <View key={day.day} style={[styles.dayCard, day.hasConflict && styles.conflictCard]}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayName}>{day.day}</Text>
              {day.hasConflict && (
                <View style={styles.conflictBadge}>
                  <MaterialIcons name="warning" size={16} color={Colors.white} />
                  <Text style={styles.conflictText}>Conflict</Text>
                </View>
              )}
            </View>
            {day.jobs.map((job) => (
              <View key={job.id} style={styles.jobItem}>
                <View style={styles.jobDot} />
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.jobCompany}>{job.company}</Text>
                  <Text style={styles.jobTime}>{job.time}</Text>
                </View>
              </View>
            ))}
            {day.hasConflict && !conflictResolved && (
              <View style={styles.conflictActions}>
                <Text style={styles.conflictTitle}>AI Conflict Detection</Text>
                <Text style={styles.conflictDesc}>This job overlaps with your existing schedule. What would you like to do?</Text>
                <View style={styles.conflictButtons}>
                  <TouchableOpacity style={styles.blockBtn} onPress={() => handleConflict(true)}>
                    <MaterialIcons name="block" size={18} color={Colors.white} />
                    <Text style={styles.blockBtnText}>Block Job</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.acceptBtn} onPress={() => handleConflict(true)}>
                    <MaterialIcons name="check-circle" size={18} color={Colors.white} />
                    <Text style={styles.acceptBtnText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {day.hasConflict && conflictResolved && (
              <View style={styles.resolvedBadge}>
                <MaterialIcons name="check-circle" size={16} color={Colors.success} />
                <Text style={styles.resolvedText}>Conflict Resolved</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.gray100, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  title: { ...Typography.h3, color: Colors.text },
  scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  dayCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md, ...Shadow.sm },
  conflictCard: { borderLeftWidth: 4, borderLeftColor: Colors.warning },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  dayName: { ...Typography.h5, color: Colors.text },
  conflictBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.warning, paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.full },
  conflictText: { ...Typography.tag, color: Colors.white, fontWeight: '600' },
  jobItem: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, marginBottom: Spacing.sm },
  jobDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary, marginTop: 6 },
  jobInfo: { flex: 1 },
  jobTitle: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  jobCompany: { ...Typography.caption, color: Colors.textSecondary },
  jobTime: { ...Typography.caption, color: Colors.textLight, marginTop: 2 },
  conflictActions: { backgroundColor: Colors.warning + '10', borderRadius: BorderRadius.md, padding: Spacing.md, marginTop: Spacing.sm },
  conflictTitle: { ...Typography.bodySmall, fontWeight: '600', color: Colors.warning, marginBottom: 4 },
  conflictDesc: { ...Typography.caption, color: Colors.textSecondary, marginBottom: Spacing.sm },
  conflictButtons: { flexDirection: 'row', gap: Spacing.sm },
  blockBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.error, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.md },
  blockBtnText: { ...Typography.buttonSmall, color: Colors.white },
  acceptBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.success, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.md },
  acceptBtnText: { ...Typography.buttonSmall, color: Colors.white },
  resolvedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: Spacing.sm },
  resolvedText: { ...Typography.caption, color: Colors.success, fontWeight: '600' },
});
