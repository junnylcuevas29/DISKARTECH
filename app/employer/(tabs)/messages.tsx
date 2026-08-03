import Avatar from '@/components/ui/Avatar';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { employerConversations } from '@/data/employerMessages';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmployerMessagesScreen() {
  const handleConversationPress = (conversationId: string) => {
    router.push(`/common/chat?id=${conversationId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Chat with student applicants</Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {employerConversations.map((conv) => (
          <TouchableOpacity
            key={conv.id}
            style={[styles.card, conv.unread && styles.unreadCard]}
            onPress={() => handleConversationPress(conv.id)}
            activeOpacity={0.7}
          >
            <View style={styles.avatarContainer}>
              <Avatar
                uri={conv.senderAvatar}
                name={conv.senderName}
                size={52}
                online={conv.online}
              />
            </View>
            <View style={styles.content}>
              <View style={styles.topRow}>
                <Text style={[styles.senderName, conv.unread && styles.unreadText]} numberOfLines={1}>
                  {conv.senderName}
                </Text>
                <Text style={styles.timestamp}>{conv.timestamp}</Text>
              </View>
              <View style={styles.bottomRow}>
                <Text style={[styles.lastMessage, conv.unread && styles.unreadText]} numberOfLines={1}>
                  {conv.lastMessage}
                </Text>
                {conv.unread && <View style={styles.unreadBadge} />}
              </View>
            </View>
          </TouchableOpacity>
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
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  avatarContainer: {
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
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
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  lastMessage: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    flex: 1,
  },
  unreadText: {
    fontWeight: '700',
    color: Colors.text,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
});
