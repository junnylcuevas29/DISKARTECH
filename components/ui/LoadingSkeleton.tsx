import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/typography';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

function Skeleton({ width = '100%', height = 20, borderRadius = BorderRadius.sm, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width: width as any, height, borderRadius, opacity },
        style,
      ]}
    />
  );
}

export function JobCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Skeleton width={52} height={52} borderRadius={BorderRadius.md} />
        <View style={styles.headerText}>
          <Skeleton width="70%" height={18} />
          <Skeleton width="50%" height={14} style={{ marginTop: 4 }} />
        </View>
      </View>
      <View style={styles.details}>
        <Skeleton width="40%" height={14} />
        <Skeleton width="30%" height={14} />
        <Skeleton width="50%" height={14} />
      </View>
      <View style={styles.tags}>
        <Skeleton width={60} height={24} borderRadius={BorderRadius.full} />
        <Skeleton width={80} height={24} borderRadius={BorderRadius.full} />
        <Skeleton width={70} height={24} borderRadius={BorderRadius.full} />
      </View>
      <View style={styles.footer}>
        <Skeleton width="40%" height={14} />
        <Skeleton width={100} height={36} borderRadius={BorderRadius.md} />
      </View>
    </View>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </View>
  );
}

export function ProfileSkeleton() {
  return (
    <View style={styles.profileContainer}>
      <Skeleton width={80} height={80} borderRadius={40} style={{ alignSelf: 'center' }} />
      <Skeleton width="60%" height={24} style={{ alignSelf: 'center', marginTop: Spacing.md }} />
      <Skeleton width="40%" height={16} style={{ alignSelf: 'center', marginTop: Spacing.xs }} />
      <View style={{ marginTop: Spacing.lg }}>
        <Skeleton width="100%" height={100} borderRadius={BorderRadius.lg} />
        <Skeleton width="100%" height={100} borderRadius={BorderRadius.lg} style={{ marginTop: Spacing.md }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.shimmer,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  headerText: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
    paddingTop: Spacing.sm,
  },
  profileContainer: {
    padding: Spacing.lg,
  },
});

