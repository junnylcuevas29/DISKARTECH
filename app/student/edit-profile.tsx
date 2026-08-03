import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const SKILLS = [
  'Cooking',
  'Tutoring',
  'Graphic Design',
  'Data Entry',
  'Delivery Assistance',
  'Cleaning',
  'Sales Assistance',
  'Event Staff',
  'Social Media Management',
  'Computer Repair',
  'Photography',
  'Customer Service',
];

const JOB_TYPES = ['Part-Time', 'Temporary', 'Seasonal', 'Freelance', 'Weekend Job', 'After-Class Job'];
const LOCATIONS = ['Barangay', 'Pinamalayan Area', '3-5 KM Radius'];

export default function EditProfileScreen() {
  // Personal
  const [firstName, setFirstName] = useState('Junnyl');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('Mabini');
  const [mobile, setMobile] = useState('0917 123 4567');
  const [email, setEmail] = useState('junnyl.mabini@example.com');

  // School
  const [schoolName, setSchoolName] = useState('University of the Philippines');
  const [course, setCourse] = useState('BS Computer Science');
  const [yearLevel, setYearLevel] = useState('3rd Year');
  const [studentNumber, setStudentNumber] = useState('2022-12345');

  // Skills & prefs
  const [skills, setSkills] = useState<string[]>([
    'Cooking',
    'Tutoring',
    'Data Entry',
    'Customer Service',
    'Cleaning',
    'Sales Assistance',
  ]);
  const [jobTypes, setJobTypes] = useState<string[]>(['Part-Time', 'Weekend Job', 'After-Class Job']);
  const [locations, setLocations] = useState<string[]>(['Barangay', 'Pinamalayan Area', '3-5 KM Radius']);

  const [availability, setAvailability] = useState('Weekdays after 5PM, Weekends full day');

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const handleSave = () => {
    Alert.alert('Profile Updated ✅', 'Your profile information has been saved successfully.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Edit Profile</Text>
            <Text style={styles.subtitle}>Update the info you registered with</Text>
          </View>
        </View>

        {/* Personal Info */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.section}>
          <InputField label="First Name" icon="person" value={firstName} onChangeText={setFirstName} />
          <InputField label="Middle Name" icon="person-outline" value={middleName} onChangeText={setMiddleName} />
          <InputField label="Last Name" icon="person" value={lastName} onChangeText={setLastName} />
          <InputField label="Mobile Number" icon="phone" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
          <InputField label="Email Address" icon="email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>

        {/* School Info */}
        <Text style={styles.sectionTitle}>School Information</Text>
        <View style={styles.section}>
          <InputField label="School Name" icon="school" value={schoolName} onChangeText={setSchoolName} />
          <InputField label="Course" icon="menu-book" value={course} onChangeText={setCourse} />
          <InputField label="Year Level" icon="format-list-numbered" value={yearLevel} onChangeText={setYearLevel} />
          <InputField label="Student Number" icon="badge" value={studentNumber} onChangeText={setStudentNumber} />
        </View>

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.section}>
          <View style={styles.chipWrap}>
            {SKILLS.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.chip, skills.includes(s) && styles.chipSelected]}
                onPress={() => setSkills(toggle(skills, s))}
              >
                <Text style={[styles.chipText, skills.includes(s) && styles.chipTextSelected]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preferred Job Type */}
        <Text style={styles.sectionTitle}>Preferred Job Type</Text>
        <View style={styles.section}>
          <View style={styles.chipWrap}>
            {JOB_TYPES.map((j) => (
              <TouchableOpacity
                key={j}
                style={[styles.chip, jobTypes.includes(j) && styles.chipSelected]}
                onPress={() => setJobTypes(toggle(jobTypes, j))}
              >
                <Text style={[styles.chipText, jobTypes.includes(j) && styles.chipTextSelected]}>{j}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preferred Location */}
        <Text style={styles.sectionTitle}>Preferred Location</Text>
        <View style={styles.section}>
          <View style={styles.chipWrap}>
            {LOCATIONS.map((l) => (
              <TouchableOpacity
                key={l}
                style={[styles.chip, locations.includes(l) && styles.chipSelected]}
                onPress={() => setLocations(toggle(locations, l))}
              >
                <Text style={[styles.chipText, locations.includes(l) && styles.chipTextSelected]}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Availability */}
        <Text style={styles.sectionTitle}>Availability</Text>
        <View style={styles.section}>
          <InputField
            label="Available Schedule"
            icon="schedule"
            value={availability}
            onChangeText={setAvailability}
            placeholder="e.g. Weekdays after 3PM"
          />
        </View>

        <PrimaryButton
          title="Save Changes"
          size="large"
          onPress={handleSave}
          icon={<MaterialIcons name="check" size={20} color={Colors.white} />}
          style={{ marginTop: Spacing.sm }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.xxl },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  headerText: { flex: 1 },
  title: { ...Typography.h3, color: Colors.text },
  subtitle: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.primary,
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
    marginTop: Spacing.sm,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray100,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { ...Typography.buttonSmall, color: Colors.textSecondary },
  chipTextSelected: { color: Colors.white },
});
