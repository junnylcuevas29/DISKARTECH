 import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { applications } from '@/data/applications';
import { formatDate, getStatusColor, getStatusIcon } from '@/utils/helpers';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const tabs = ['Pending', 'Viewed', 'Shortlisted', 'Interview', 'Accepted', 'Rejected', 'Completed', 'Cancelled'] as const;

export default function ApplicationsScreen() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Pending');

  const filteredApplications = applications.filter((app) => {
    if (activeTab === 'Pending') return app.status === 'pending';
    if (activeTab === 'Viewed') return app.status === 'viewed';
    if (activeTab === 'Shortlisted') return app.status === 'shortlisted';
    if (activeTab === 'Interview') return app.status === 'interview';
    if (activeTab === 'Accepted') return app.status === 'accepted';
    if (activeTab === 'Rejected') return app.status === 'rejected';
    if (activeTab === 'Completed') return app.status === 'completed';
    if (activeTab === 'Cancelled') return app.status === 'cancelled';
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Applications</Text>
        <Text style={styles.subtitle}>Track your job applications</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer} contentContainerStyle={styles.tabsContent}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            {tab === 'Pending' && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{applications.filter((a) => a.status === 'pending').length}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filteredApplications.length === 0 ? (
          <EmptyState icon="inbox" title={`No ${activeTab} Applications`} message={`You don't have any ${activeTab.toLowerCase()} applications yet.`} />
        ) : (
          filteredApplications.map((app) => (
            <View key={app.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.logoContainer}>
                  <Image source={{ uri: app.companyLogo }} style={styles.logo} />
                </View>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(app.status) }]} />
<View style={styles.cardInfo}>
                  <Text style={styles.jobTitle}>{app.jobTitle}</Text>
                  <Text style={styles.companyName}>{app.companyName}</Text>
                </View>
              </View>
              <View style={styles.cardDetails}>
                <View style={styles.detailItem}>
                  <MaterialIcons name="attach-money" size={14} color={Colors.textLight} />
                  <Text style={styles.detailText}>{app.salary}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="calendar-today" size={14} color={Colors.textLight} />
                  <Text style={styles.detailText}>{formatDate(app.appliedDate)}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name={getStatusIcon(app.status) as any} size={14} color={getStatusColor(app.status)} />
                  <Text style={[styles.detailText, { color: getStatusColor(app.status), fontWeight: '600' }]}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</Text>
                </View>
              </View>
<View style={styles.statusRow}>
                <Badge text={app.status.charAt(0).toUpperCase() + app.status.slice(1)} variant={app.status === 'rejected' || app.status === 'cancelled' ? 'error' : app.status === 'accepted' || app.status === 'completed' ? 'success' : app.status === 'pending' ? 'warning' : 'info'} size="small" />
                <Text style={styles.employerName}>{app.employerName}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.md },
  title: { ...Typography.h2, color: Colors.text },
  subtitle: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  tabsContainer: { maxHeight: 44, marginBottom: Spacing.sm },
  tabsContent: { paddingHorizontal: Spacing.lg, gap: Spacing.sm, alignItems: 'center' },
  tab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, backgroundColor: Colors.white, gap: Spacing.xs },
  activeTab: { backgroundColor: Colors.primary },
  tabText: { ...Typography.buttonSmall, color: Colors.textSecondary },
  activeTabText: { color: Colors.white },
  tabBadge: { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: BorderRadius.full, paddingHorizontal: 6, paddingVertical: 2 },
  tabBadgeText: { ...Typography.tag, color: Colors.white, fontWeight: '700' },
  list: { flex: 1 },
  listContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  card: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md, ...Shadow.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  logoContainer: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden', marginRight: Spacing.md },
  logo: { width: 40, height: 40, borderRadius: 20 },
  statusIndicator: { width: 12, height: 12, borderRadius: 6, marginRight: Spacing.sm },
  cardInfo: { flex: 1 },
  jobTitle: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  companyName: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  cardDetails: { flexDirection: 'row', gap: Spacing.lg, marginBottom: Spacing.sm, marginLeft: 52 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailText: { ...Typography.caption, color: Colors.textSecondary },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: Colors.gray100, paddingTop: Spacing.sm },
  employerName: { ...Typography.caption, color: Colors.textLight },
});
