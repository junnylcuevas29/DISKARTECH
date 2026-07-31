import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Typography } from '@/constants/typography';
import React, { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
}: PrimaryButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: Colors.primary,
          ...Shadow.md,
        };
      case 'secondary':
        return {
          backgroundColor: Colors.secondary,
          borderWidth: 2,
          borderColor: Colors.primary,
          ...Shadow.sm,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: Colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary': return Colors.white;
      case 'secondary': return Colors.primary;
      case 'outline': return Colors.primary;
      case 'ghost': return Colors.primary;
    }
  };

  const getSize = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingVertical: 10, paddingHorizontal: 20, borderRadius: BorderRadius.md };
      case 'medium':
        return { paddingVertical: 14, paddingHorizontal: 28, borderRadius: BorderRadius.lg };
      case 'large':
        return { paddingVertical: 18, paddingHorizontal: 36, borderRadius: BorderRadius.xl };
    }
  };

  const getFontSize = (): TextStyle => {
    switch (size) {
      case 'small': return Typography.buttonSmall;
      case 'medium': return Typography.button;
      case 'large': return { ...Typography.button, fontSize: 18 };
    }
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, fullWidth && styles.fullWidth]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.9}
        style={[
          styles.container,
          getContainerStyle(),
          getSize(),
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.primary} size="small" />
        ) : (
          <>
            {icon && <>{icon}</>}
            <Text
              style={[
                styles.text,
                getFontSize(),
                { color: getTextColor() },
                icon ? { marginLeft: 8 } : undefined,
                textStyle,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
  },
});

