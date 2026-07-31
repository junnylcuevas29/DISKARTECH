import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function JobPostingScreen() {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [schedule, setSchedule] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [skills, setSkills] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Post a New Job</Text>
          </View>
          <Text style={styles.subtitle}>Fill in the details to attract the best student applicants</Text>

          <InputField label="Job Title" placeholder="e.g. Service Crew, Barista" value={jobTitle} onChangeText={setJobTitle} icon="work" />
          
          <View style={styles.textAreaContainer}>
            <Text style={styles.label}>Job Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the job responsibilities and expectations..."
              placeholderTextColor={Colors.gray400}
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
          </View>

          <InputField label="Salary Range" placeholder="e.g. ₱75 - ₱100/hr" value={salary} onChangeText={setSalary} icon="attach-money" />
          <InputField label="Schedule" placeholder="e.g. Flexible, Weekends, Morning" value={schedule} onChangeText={setSchedule} icon="schedule" />
          <InputField label="Location" placeholder="e.g. Quezon City" value={location} onChangeText={setLocation} icon="location-on" />

          <View style={styles.textAreaContainer}>
            <Text style={styles.label}>Requirements</Text>
            <TextInput
              style={styles.textArea}
              placeholder="List the job requirements (one per line)"
              placeholderTextColor={Colors.gray400}
              value={requirements}
              onChangeText={setRequirements}
              multiline
              textAlignVertical="top"
            />
          </View>

          <InputField label="Skills Needed" placeholder="e.g. Communication, Customer Service" value={skills} onChangeText={setSkills} icon="handyman" />

          <PrimaryButton
            title="Submit Job Posting"
            onPress={() => router.back()}
            size="large"
            style={{ marginTop: Spacing.lg }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.xxxl },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.gray100,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  title: { ...Typography.h3, color: Colors.text },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.lg },
  textAreaContainer: { marginBottom: Spacing.md },
  label: { ...Typography.label, color: Colors.text, marginBottom: Spacing.sm },
  textArea: {
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    padding: Spacing.md, backgroundColor: Colors.white, ...Typography.body, color: Colors.text,
    minHeight: 100,
  },
});
