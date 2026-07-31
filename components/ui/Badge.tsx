import { Colors } from '@/constants/colors';
import { BorderRadius, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  icon?: keyof typeof MaterialIcons.glyphMap;
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

const variantColors = {
  success: { bg: '#E8F5E9', text: '#2E7D32', icon: '#4CAF50' },
  warning: { bg: '#FFF3E0', text: '#E65100', icon: '#FF9800' },
  error: { bg: '#FFEBEE', text: '#C62828', icon: '#F44336' },
  info: { bg: '#E3F2FD', text: '#1565C0', icon: '#2196F3' },
  default: { bg: Colors.gray100, text: Colors.textSecondary, icon: Colors.gray500 },
};

export default function Badge({ text, variant = 'default', icon, size = 'small', style }: BadgeProps) {
  const colors = variantColors[variant];
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          paddingVertical: isSmall ? 4 : 6,
          paddingHorizontal: isSmall ? 10 : 14,
        },
        style,
      ]}
    >
      {icon && (
        <MaterialIcons name={icon} size={isSmall ? 14 : 16} color={colors.icon} style={styles.icon} />
      )}
      <Text
        style={[
          isSmall ? Typography.tag : Typography.bodySmall,
          { color: colors.text, fontWeight: '600' },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
});

