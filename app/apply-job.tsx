import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ApplyJobScreen() {
  const { id } = useLocalSearchParams();
  const [resume, setResume] = useState('uploaded_resume.pdf');
  const [coverLetter, setCoverLetter] = useState('');
  const [availability, setAvailability] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Apply for Job</Text>
        </View>

        <View style={styles.resumeCard}>
          <MaterialIcons name="description" size={24} color={Colors.primary} />
          <View style={styles.resumeInfo}>
            <Text style={styles.resumeLabel}>Resume</Text>
            <Text style={styles.resumeName}>{resume}</Text>
          </View>
          <TouchableOpacity style={styles.changeBtn}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cover Letter</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Write a brief cover letter explaining why you're a good fit..."
            placeholderTextColor={Colors.gray400}
            value={coverLetter}
            onChangeText={setCoverLetter}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <InputField
            placeholder="e.g. Weekdays after 3PM, Weekends full day"
            value={availability}
            onChangeText={setAvailability}
            icon="schedule"
          />
        </View>

        <View style={styles.confirmSection}>
          <MaterialIcons name="info-outline" size={20} color={Colors.textSecondary} />
          <Text style={styles.confirmText}>By submitting, you confirm that all information provided is accurate and you agree to our terms.</Text>
        </View>

        <PrimaryButton title="Submit Application" onPress={() => router.back()} size="large" icon={<MaterialIcons name="send" size={20} color={Colors.white} />} style={{ marginTop: Spacing.md }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.xxl },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.gray100, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  title: { ...Typography.h3, color: Colors.text },
  resumeCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary + '08',
    borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md,
    borderWidth: 1.5, borderColor: Colors.primary + '20', borderStyle: 'dashed',
  },
  resumeInfo: { flex: 1, marginLeft: Spacing.md },
  resumeLabel: { ...Typography.caption, color: Colors.textLight },
  resumeName: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text, marginTop: 2 },
  changeBtn: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  changeText: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '600' },
  section: { marginBottom: Spacing.md },
  sectionTitle: { ...Typography.h5, color: Colors.text, marginBottom: Spacing.sm },
  textArea: {
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    padding: Spacing.md, backgroundColor: Colors.white, ...Typography.body, color: Colors.text,
    minHeight: 120,
  },
  confirmSection: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.md },
  confirmText: { ...Typography.bodySmall, color: Colors.textSecondary, flex: 1, lineHeight: 20 },
});
