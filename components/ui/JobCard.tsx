import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { Job } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface JobCardProps {
  job: Job;
  onPress: () => void;
  onBookmark?: () => void;
  onApply?: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

export default function JobCard({ job, onPress, onBookmark, onApply, variant = 'default' }: JobCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
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

  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.95}
        style={[
          styles.card,
          Shadow.md,
          isFeatured && styles.featuredCard,
        ]}
      >
        {/* Gradient top for featured */}
        {isFeatured && <View style={styles.featuredGradient} />}

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: job.companyLogo }} style={styles.logo} />
          </View>
          <View style={styles.headerInfo}>
            <View style={styles.titleRow}>
              <Text style={[styles.jobTitle, isFeatured && styles.featuredText]} numberOfLines={1}>
                {job.jobTitle}
              </Text>
              {job.verified && (
                <MaterialIcons name="verified" size={18} color={Colors.verified} />
              )}
            </View>
            <Text style={styles.companyName} numberOfLines={1}>{job.companyName}</Text>
          </View>
          {!isCompact && (
            <TouchableOpacity onPress={onBookmark} style={styles.bookmarkBtn}>
              <MaterialIcons
                name={job.bookmarked ? 'bookmark' : 'bookmark-border'}
                size={24}
                color={job.bookmarked ? Colors.bookmark : Colors.gray400}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Details */}
        <View style={[styles.details, isCompact && styles.compactDetails]}>
          <View style={styles.detailItem}>
            <MaterialIcons name="attach-money" size={16} color={Colors.primary} />
            <Text style={styles.detailText}>{job.salary}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="location-on" size={16} color={Colors.gray500} />
            <Text style={[styles.detailText, styles.locationText]} numberOfLines={1}>{job.distance}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="schedule" size={16} color={Colors.gray500} />
            <Text style={styles.detailText} numberOfLines={1}>{job.workingHours}</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <MaterialIcons name="location-city" size={14} color={Colors.gray400} />
          <Text style={styles.locationFull} numberOfLines={1}>{job.location}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{job.jobType}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{job.schedule}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{job.category}</Text>
          </View>
        </View>

        {/* Footer */}
        {!isCompact && (
          <View style={styles.footer}>
            <Text style={styles.postedDate}>{job.postedDate} • {job.applicants} applicants</Text>
            <TouchableOpacity onPress={onApply} style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Apply Now</Text>
              <MaterialIcons name="arrow-forward" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  featuredCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  featuredGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Colors.primary,
     borderRadius: BorderRadius.lg,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  logoContainer: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.gray100,
    overflow: 'hidden',
    marginRight: Spacing.sm,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
  },
  headerInfo: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jobTitle: {
    ...Typography.h5,
    color: Colors.text,
    flexShrink: 1,
  },
  featuredText: {
    color: Colors.primary,
  },
  companyName: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  bookmarkBtn: {
    padding: Spacing.xs,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  compactDetails: {
    gap: Spacing.xs,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  locationText: {
    maxWidth: 100,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  locationFull: {
    ...Typography.caption,
    color: Colors.textLight,
    flex: 1,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  tag: {
    backgroundColor: Colors.gray100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  tagText: {
    ...Typography.tag,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
    paddingTop: Spacing.sm,
  },
  postedDate: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: 4,
  },
  applyBtnText: {
    ...Typography.buttonSmall,
    color: Colors.white,
  },
});

