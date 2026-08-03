import Avatar from '@/components/ui/Avatar';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { employerConversations } from '@/data/employerMessages';
import { conversations } from '@/data/messages';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [safetyMenuVisible, setSafetyMenuVisible] = useState(false);
const conversation =
    conversations.find((c) => c.id === id) ||
    employerConversations.find((c) => c.id === id);

  if (!conversation) {
    return (
      <View style={styles.container}>
        <Text>Conversation not found</Text>
      </View>
    );
  }

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage('');
  };

  const handleReportUser = () => {
    setSafetyMenuVisible(false);
    setTimeout(() => {
      Alert.alert(
        'Report User',
        'Report this user for suspicious, abusive, or scam behavior. Our team will review this report within 24 hours.', [
        { text: 'Report as Scam', onPress: () => Alert.alert('Report Submitted', 'Thank you for keeping DiskarTech safe. Our team will review this report.') },
        { text: 'Report as Abuse', onPress: () => Alert.alert('Report Submitted', 'Thank you for keeping DiskarTech safe. Our team will review this report.') },
        { text: 'Report as Harassment', onPress: () => Alert.alert('Report Submitted', 'Thank you for keeping DiskarTech safe. Our team will review this report.') },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }, 250);
  };

  const handleBlockUser = () => {
    setSafetyMenuVisible(false);
    setTimeout(() => {
      Alert.alert(
        'Block User',
        `Block ${conversation.senderName}? You will no longer receive messages from this user.`, [
        { text: 'Block', style: 'destructive', onPress: () => Alert.alert('User Blocked', `${conversation.senderName} has been blocked.`) },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }, 250);
  };

  const handleEmergencyContact = () => {
    setSafetyMenuVisible(false);
    setTimeout(() => {
      Alert.alert(
        'Emergency Contact',
        'Your emergency contact details are saved. In case of emergency during a job, contact your emergency contact or local authorities.', [
        { text: 'Call 911', onPress: () => {} },
        { text: 'Notify Emergency Contact', onPress: () => Alert.alert('Notification Sent', 'Your emergency contact has been notified with your live location.') },
        { text: 'Close', style: 'cancel' },
      ]);
    }, 250);
  };

  const handleSendResume = () => {
    Alert.alert('Resume Sent', 'Your resume has been sent to this employer.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Avatar uri={conversation.senderAvatar} name={conversation.senderName} size={40} online={conversation.online} />
        <View style={styles.headerInfo}>
          <Text style={styles.senderName}>{conversation.senderName}</Text>
          <Text style={styles.onlineStatus}>{conversation.online ? 'Online' : 'Offline'}</Text>
        </View>
        <TouchableOpacity style={styles.moreBtn} onPress={() => setSafetyMenuVisible(!safetyMenuVisible)}>
          <MaterialIcons name="more-vert" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Safety Menu */}
      {safetyMenuVisible && (
        <View style={styles.safetyMenu}>
          <TouchableOpacity style={styles.safetyItem} onPress={handleReportUser}>
            <MaterialIcons name="report" size={20} color={Colors.error} />
            <Text style={styles.safetyItemText}>Report User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.safetyItem} onPress={handleBlockUser}>
            <MaterialIcons name="block" size={20} color={Colors.error} />
            <Text style={styles.safetyItemText}>Block User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.safetyItem} onPress={() => setSafetyMenuVisible(false)}>
            <MaterialIcons name="sos" size={20} color={Colors.warning} />
            <Text style={[styles.safetyItemText, { color: Colors.warning }]}>Report Unsafe Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.safetyItem} onPress={handleEmergencyContact}>
            <MaterialIcons name="emergency" size={20} color={Colors.primary} />
            <Text style={styles.safetyItemText}>Emergency Contact</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Messages */}
      <ScrollView
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {conversation.messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'me' ? styles.myMessage : styles.theirMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.sender === 'me' ? styles.myMessageText : styles.theirMessageText,
              ]}
            >
              {msg.text}
            </Text>
            <Text
              style={[
                styles.messageTime,
                msg.sender === 'me' ? styles.myMessageTime : styles.theirMessageTime,
              ]}
            >
              {msg.timestamp}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachBtn}>
          <MaterialIcons name="attach-file" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={Colors.gray400}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity onPress={handleSend} style={[styles.sendBtn, message.trim() && styles.sendBtnActive]}>
          <MaterialIcons
            name="send"
            size={22}
            color={message.trim() ? Colors.white : Colors.gray400}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  backBtn: {
    marginRight: Spacing.md,
  },
  headerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  senderName: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
  },
  onlineStatus: {
    ...Typography.caption,
    color: Colors.success,
  },
  moreBtn: {
    padding: Spacing.sm,
  },
  safetyMenu: {
    position: 'absolute',
    top: 84,
    right: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xs,
    zIndex: 10,
    ...Shadow.md,
    minWidth: 220,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
  },
  safetyItemText: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '500',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  myMessage: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    ...Shadow.sm,
  },
  messageText: {
    ...Typography.bodySmall,
    lineHeight: 20,
  },
  myMessageText: {
    color: Colors.white,
  },
  theirMessageText: {
    color: Colors.text,
  },
  messageTime: {
    ...Typography.caption,
    marginTop: 4,
    textAlign: 'right',
  },
  myMessageTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  theirMessageTime: {
    color: Colors.textLight,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
    gap: Spacing.sm,
  },
  attachBtn: {
    padding: Spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Typography.body,
    color: Colors.text,
    maxHeight: 100,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: Colors.primary,
  },
});

