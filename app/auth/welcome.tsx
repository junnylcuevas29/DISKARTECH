import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.logoIcon}>
          <MaterialIcons name="work" size={48} color={Colors.white} />
        </View>
        <Text style={styles.appName}>DiskarTech</Text>
        <Text style={styles.tagline}>Smart Jobs for Smart Students</Text>
      </LinearGradient>

      {/* Content */}
      <View style={styles.body}>
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeSubtitle}>
          Find the perfect part-time job that fits your student life.
        </Text>

        {/* Features */}
        <View style={styles.features}>
          <FeatureItem icon="schedule" title="Flexible Hours" subtitle="Work around your class schedule" />
          <FeatureItem icon="verified" title="Verified Employers" subtitle="Trusted local businesses" />
          <FeatureItem icon="school" title="Student-Friendly" subtitle="Jobs designed for students" />
          <FeatureItem icon="location-on" title="Nearby Jobs" subtitle="Find work close to you" />
        </View>

        {/* Buttons */}
        <View style={styles.buttonSection}>
<PrimaryButton
            title="Student Login"
            onPress={() => router.push('/auth/login?type=student')}
            size="large"
            icon={<MaterialIcons name="school" size={20} color={Colors.white} />}
          />
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>
          <PrimaryButton
            title="Employer Login"
            onPress={() => router.push('/auth/login?type=employer')}
            variant="secondary"
            size="large"
            icon={<MaterialIcons name="business" size={20} color={Colors.primary} />}
          />
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => router.push('/auth/register-student')}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function FeatureItem({ icon, title, subtitle }: { icon: keyof typeof MaterialIcons.glyphMap; title: string; subtitle: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <MaterialIcons name={icon} size={24} color={Colors.primary} />
      </View>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
  },
  tagline: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
    marginTop: Spacing.xs,
  },
  body: {
    flex: 1,
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  welcomeTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  welcomeSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  features: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
  },
  featureSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  buttonSection: {
    gap: Spacing.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginVertical: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray200,
  },
  dividerText: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  registerText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  registerLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

