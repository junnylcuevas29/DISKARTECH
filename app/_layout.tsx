import '../global.css';

import { Colors } from '@/constants/colors';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="auth/welcome" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="auth/register-student" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="auth/register-employer" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="student/(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="student/job-details" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="student/apply-job" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="student/schedule" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="student/earnings" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="student/reviews" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="student/verification-status" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="student/edit-profile" options={{ headerShown: false, animation: 'slide_from_right' }} />
<Stack.Screen name="employer/(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="employer/dashboard" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="employer/job-posting" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="employer/applicant-details" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="employer/edit-profile" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="common/chat" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="common/notifications" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="common/settings" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </>
  );
}
