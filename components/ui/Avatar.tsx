import { Colors } from '@/constants/colors';
import { BorderRadius } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  verified?: boolean;
  online?: boolean;
  style?: ViewStyle;
}

export default function Avatar({ uri, name, size = 48, verified = false, online = false, style }: AvatarProps) {
  const getInitials = () => {
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const borderRadius = size / 2;

  return (
    <View style={[styles.container, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius }]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              width: size,
              height: size,
              borderRadius,
              backgroundColor: Colors.primary + '20',
            },
          ]}
        >
          <Text
            style={[
              styles.initials,
              { fontSize: size * 0.38, color: Colors.primary },
            ]}
          >
            {getInitials()}
          </Text>
        </View>
      )}
      {verified && (
        <View style={[styles.verifiedBadge, { bottom: 0, right: 0 }]}>
          <MaterialIcons name="verified" size={size * 0.3} color={Colors.verified} />
        </View>
      )}
      {online && (
        <View
          style={[
            styles.onlineIndicator,
            { width: size * 0.28, height: size * 0.28, borderRadius: size * 0.14, bottom: 2, right: 2 },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: Colors.gray100,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '700',
  },
  verifiedBadge: {
    position: 'absolute',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
  },
  onlineIndicator: {
    position: 'absolute',
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: BorderRadius.full,
  },
});

