import { Redirect } from 'expo-router';
import React from 'react';

export default function EmployerDashboardScreen() {
  return <Redirect href="/employer/(tabs)/home" />;
}
