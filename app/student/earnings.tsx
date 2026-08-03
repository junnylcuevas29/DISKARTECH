import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const earningsData = [
  { id: '1', jobTitle: 'Service Crew', companyName: "McDonald's", amount: 4500, status: 'completed' as const, date: '2024-01-15' },
  { id: '2', jobTitle: 'Service Crew', companyName: "McDonald's", amount: 3800, status: 'completed' as const, date: '2024-01-08' },
  { id: '3', jobTitle: 'Online Tutor', companyName: 'TutorPro PH', amount: 2400, status: 'pending' as const, date: '2024-01-10' },
  { id: '4', jobTitle: 'Delivery Partner', companyName: 'Grab', amount: 3200, status: 'completed' as const, date: '2024-01-05' },
];

export default function EarningsScreen() {
  const [period, setPeriod] = useState('This Month');
  const totalEarnings = earningsData.filter(e => e.status === 'completed').reduce((sum, e) => sum + e.amount, 0);
  const pendingEarnings = earningsData.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Earnings</Text>
        <TouchableOpacity style={styles.periodBtn}>
          <Text style={styles.periodText}>{period}</Text>
          <MaterialIcons name="arrow-drop-down" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Earned</Text>
            <Text style={styles.summaryTotal}>₱{totalEarnings.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryDivider} />
<View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Pending</Text>
            <Text style={styles.summaryPending}>₱{pendingEarnings.toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.badge}>
          <MaterialIcons name="verified" size={16} color={Colors.primary} />
          <Text style={styles.badgeText}>Available for withdrawal</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {earningsData.map((earning) => (
          <View key={earning.id} style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{earning.companyName[0]}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.jobTitle}>{earning.jobTitle}</Text>
                <Text style={styles.companyName}>{earning.companyName}</Text>
                <Text style={styles.date}>{earning.date}</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.amount}>₱{earning.amount.toLocaleString()}</Text>
              <View style={[styles.statusBadge, { backgroundColor: earning.status === 'completed' ? '#E8F5E9' : '#FFF3E0' }]}>
                <Text style={[styles.statusText, { color: earning.status === 'completed' ? '#4CAF50' : '#FF9800' }]}>
                  {earning.status === 'completed' ? 'Completed' : 'Pending'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.md, backgroundColor: Colors.white },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.gray100, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  title: { ...Typography.h3, color: Colors.text, flex: 1 },
  periodBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray100, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full },
  periodText: { ...Typography.bodySmall, color: Colors.text, fontWeight: '500' },
  summaryCard: { backgroundColor: Colors.white, margin: Spacing.lg, borderRadius: BorderRadius.lg, padding: Spacing.lg, ...Shadow.md },
  summaryRow: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryLabel: { ...Typography.caption, color: Colors.textLight, marginBottom: 4 },
  summaryTotal: { ...Typography.h2, color: Colors.primary },
  summaryPending: { ...Typography.h2, color: Colors.warning },
  summaryDivider: { width: 1, height: 50, backgroundColor: Colors.gray200, marginHorizontal: Spacing.lg },
  badge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.gray100 },
  badgeText: { ...Typography.caption, color: Colors.primary, fontWeight: '500' },
  listContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary + '15', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  avatarText: { ...Typography.body, fontWeight: '700', color: Colors.primary },
  cardInfo: { flex: 1 },
  jobTitle: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  companyName: { ...Typography.caption, color: Colors.textSecondary },
  date: { ...Typography.caption, color: Colors.textLight, marginTop: 2, fontSize: 11 },
  cardRight: { alignItems: 'flex-end', gap: 4 },
  amount: { ...Typography.h5, color: Colors.primary },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: BorderRadius.full },
  statusText: { ...Typography.tag, fontWeight: '600' },
});
