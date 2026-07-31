import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryCardProps {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  count: number;
  color: string;
  onPress: () => void;
}

export default function CategoryCard({ name, icon, count, color, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
        <MaterialIcons name={icon} size={28} color={color} />
      </View>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.count}>{count} jobs</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    width: 100,
    marginRight: Spacing.sm,
    ...Shadow.sm,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  name: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  count: {
    ...Typography.caption,
    color: Colors.textLight,
  },
});

