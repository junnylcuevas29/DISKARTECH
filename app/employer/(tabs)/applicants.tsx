import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { employerApplicants } from '@/data/employerApplicants';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Filter = 'all' | 'pending' | 'accepted' | 'rejected';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'rejected', label: 'Rejected' },
];

export default function EmployerApplicantsScreen() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = employerApplicants.filter((a) => filter === 'all' || a.status === filter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Applicants</Text>
        <Text style={styles.subtitle}>Manage your job applicants</Text>
      </View>

      {/* Filter tabs */}
      <View style={styles.filterWrap}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterTab, filter === f.key && styles.filterTabActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((app) => (
          <View key={app.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Avatar uri={app.avatar} name={app.name} size={48} />
              <View style={styles.cardInfo}>
                <Text style={styles.appName}>{app.name}</Text>
                <Text style={styles.appPosition}>{app.position}</Text>
              </View>
              <View style={styles.matchBadge}>
                <Text style={styles.matchValue}>{app.matchScore}%</Text>
                <Text style={styles.matchLabel}>Match</Text>
              </View>
            </View>

            {/* Meta row */}
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <MaterialIcons name="location-on" size={14} color={Colors.textSecondary} />
                <Text style={styles.metaText}>{app.distance}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="schedule" size={14} color={Colors.textSecondary} />
                <Text style={styles.metaText}>{app.availability}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="star" size={14} color={Colors.warning} />
                <Text style={styles.metaText}>{app.rating}</Text>
              </View>
            </View>

            {/* Skills */}
            <View style={styles.skillsRow}>
              {app.skills.map((s) => (
                <View key={s} style={styles.skillTag}>
                  <Text style={styles.skillText}>{s}</Text>
                </View>
              ))}
            </View>

            {/* Status */}
            <View style={styles.statusRow}>
              <Badge
                text={app.status === 'pending' ? 'Pending' : app.status === 'accepted' ? 'Accepted' : app.status === 'rejected' ? 'Rejected' : 'Shortlisted'}
                variant={app.status === 'pending' ? 'warning' : app.status === 'accepted' ? 'success' : app.status === 'rejected' ? 'error' : 'info'}
                size="small"
              />
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => router.push(`/employer/applicant-details?id=${app.id}`)}
              >
                <MaterialIcons name="visibility" size={16} color={Colors.primary} />
                <Text style={styles.actionText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.acceptBtn]}>
                <MaterialIcons name="check-circle" size={16} color={Colors.success} />
                <Text style={[styles.actionText, { color: Colors.success }]}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]}>
                <MaterialIcons name="cancel" size={16} color={Colors.error} />
                <Text style={[styles.actionText, { color: Colors.error }]}>Reject</Text>
              </TouchableOpacity>
<TouchableOpacity
                style={[styles.actionBtn, styles.messageBtn]}
onPress={() => router.push(`/common/chat?id=e${app.id}`)}
              >
                <MaterialIcons name="chat" size={16} color={Colors.primary} />
                <Text style={styles.actionText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.md },
  title: { ...Typography.h2, color: Colors.text },
  subtitle: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  filterWrap: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  filterTab: {
    flex: 1, paddingVertical: 10, borderRadius: BorderRadius.full, borderWidth: 1.5,
    borderColor: Colors.gray200, backgroundColor: Colors.white, alignItems: 'center',
  },
  filterTabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { ...Typography.buttonSmall, color: Colors.textSecondary },
  filterTextActive: { color: Colors.white },
  list: { flex: 1 },
  listContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  card: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, ...Shadow.sm,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  cardInfo: { flex: 1, marginLeft: Spacing.md },
  appName: { ...Typography.bodySmall, fontWeight: '700', color: Colors.text },
  appPosition: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  matchBadge: {
    backgroundColor: Colors.success + '15', borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, alignItems: 'center',
  },
  matchValue: { ...Typography.bodySmall, color: Colors.success, fontWeight: '700' },
  matchLabel: { ...Typography.tag, fontSize: 9, color: Colors.success },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { ...Typography.caption, color: Colors.textSecondary },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md },
  skillTag: {
    backgroundColor: Colors.primary + '10', paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs, borderRadius: BorderRadius.full,
  },
  skillText: { ...Typography.caption, color: Colors.primary, fontWeight: '500' },
  statusRow: { marginBottom: Spacing.md },
  actions: { flexDirection: 'row', gap: Spacing.sm },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, paddingVertical: 10, borderRadius: BorderRadius.md, borderWidth: 1.5,
    borderColor: Colors.gray200, backgroundColor: Colors.white,
  },
  acceptBtn: { borderColor: Colors.success + '40', backgroundColor: Colors.success + '08' },
  rejectBtn: { borderColor: Colors.error + '40', backgroundColor: Colors.error + '08' },
  messageBtn: { borderColor: Colors.primary + '40', backgroundColor: Colors.primary + '08' },
  actionText: { ...Typography.buttonSmall, color: Colors.primary, fontWeight: '600' },
});
