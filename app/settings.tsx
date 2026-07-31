import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account */}
        <Text style={styles.groupTitle}>Account</Text>
        <View style={styles.group}>
          <SettingItem icon="person" label="Edit Profile" />
          <SettingItem icon="verified-user" label="Verification Status" badge="Verified" badgeColor="success" />
          <SettingItem icon="lock" label="Change Password" />
        </View>

        {/* Preferences */}
        <Text style={styles.groupTitle}>Preferences</Text>
        <View style={styles.group}>
          <SettingToggle icon="dark-mode" label="Dark Mode" value={darkMode} onValueChange={setDarkMode} />
          <SettingToggle icon="notifications" label="Push Notifications" value={notifications} onValueChange={setNotifications} />
          <SettingItem icon="language" label="Language" value="English" />
        </View>

        {/* Support */}
        <Text style={styles.groupTitle}>Support</Text>
        <View style={styles.group}>
          <SettingItem icon="help-outline" label="Help Center" />
          <SettingItem icon="chat" label="Contact Support" />
          <SettingItem icon="report-problem" label="Report a Problem" />
        </View>

        {/* About */}
        <Text style={styles.groupTitle}>About</Text>
        <View style={styles.group}>
          <SettingItem icon="info-outline" label="About DiskarTech" />
          <SettingItem icon="description" label="Terms of Service" />
          <SettingItem icon="security" label="Privacy Policy" />
          <SettingItem icon="code" label="App Version" value="1.0.0" />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace('/auth/welcome')}
        >
          <MaterialIcons name="logout" size={22} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function SettingItem({ icon, label, value, badge, badgeColor }: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value?: string;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <TouchableOpacity style={styles.settingItem}>
      <MaterialIcons name={icon} size={22} color={Colors.text} />
      <Text style={styles.settingLabel}>{label}</Text>
      <View style={styles.settingRight}>
        {badge && (
          <View style={[styles.badge, { backgroundColor: badgeColor === 'success' ? '#E8F5E9' : Colors.gray100 }]}>
            <Text style={[styles.badgeText, { color: badgeColor === 'success' ? '#2E7D32' : Colors.textSecondary }]}>
              {badge}
            </Text>
          </View>
        )}
        {value && <Text style={styles.settingValue}>{value}</Text>}
        <MaterialIcons name="chevron-right" size={20} color={Colors.gray400} />
      </View>
    </TouchableOpacity>
  );
}

function SettingToggle({ icon, label, value, onValueChange }: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) {
  return (
    <View style={styles.settingItem}>
      <MaterialIcons name={icon} size={22} color={Colors.text} />
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.gray300, true: Colors.primary + '60' }}
        thumbColor={value ? Colors.primary : Colors.gray400}
      />
    </View>
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  title: {
    ...Typography.h3,
    color: Colors.text,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  groupTitle: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  group: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
    gap: Spacing.md,
  },
  settingLabel: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  settingValue: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    ...Typography.tag,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.lg,
    ...Shadow.sm,
  },
  logoutText: {
    ...Typography.body,
    color: Colors.error,
    fontWeight: '600',
  },
});

