import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { Notification } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NotificationCardProps {
  notification: Notification;
  onPress: () => void;
}

const typeConfig = {
  job_recommendation: { icon: 'work', color: '#2196F3', bg: '#E3F2FD' },
  application_accepted: { icon: 'check-circle', color: '#4CAF50', bg: '#E8F5E9' },
  interview_reminder: { icon: 'event', color: '#FF9800', bg: '#FFF3E0' },
  verification: { icon: 'verified-user', color: '#9C27B0', bg: '#F3E5F5' },
  message: { icon: 'message', color: '#D32F2F', bg: '#FFEBEE' },
};

export default function NotificationCard({ notification, onPress }: NotificationCardProps) {
  const config = typeConfig[notification.type] || typeConfig.job_recommendation;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.card, !notification.read && styles.unread]}
    >
      <View style={[styles.iconContainer, { backgroundColor: config.bg }]}>
        <MaterialIcons name={config.icon as any} size={24} color={config.color} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{notification.title}</Text>
          <Text style={styles.timestamp}>{notification.timestamp}</Text>
        </View>
        <Text style={styles.message} numberOfLines={2}>{notification.message}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  unread: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  timestamp: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  message: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: Spacing.sm,
    marginTop: Spacing.xs,
  },
});

