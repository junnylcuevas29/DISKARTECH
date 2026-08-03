import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const reviews = [
  { id: '1', employerName: "McDonald's SM North", rating: 4.5, comment: 'Great workplace! Very understanding of student schedules. Flexible hours and free meals.', date: '2 weeks ago' },
  { id: '2', employerName: 'Starbucks BGC', rating: 5, comment: 'Excellent training program. Learned a lot about coffee and customer service. Highly recommended!', date: '1 month ago' },
  { id: '3', employerName: '7-Eleven Katipunan', rating: 3.5, comment: 'Good for night shift students. Decent pay but can be busy during peak hours.', date: '2 months ago' },
  { id: '4', employerName: 'Grab PH', rating: 4, comment: 'Very flexible. Perfect for students who have their own motorcycle. Good earnings.', date: '3 months ago' },
];

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <MaterialIcons key={i} name={i <= Math.floor(rating) ? 'star' : i - 0.5 <= rating ? 'star-half' : 'star-border'} size={16} color="#FFB300" />
    );
  }
  return stars;
};

export default function ReviewsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>My Reviews</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {reviews.map((review) => (
          <View key={review.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{review.employerName[0]}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.employerName}>{review.employerName}</Text>
                <View style={styles.starsRow}>{renderStars(review.rating)}</View>
              </View>
              <Text style={styles.rating}>{review.rating}</Text>
            </View>
            <Text style={styles.comment}>"{review.comment}"</Text>
            <Text style={styles.date}>{review.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.md, backgroundColor: Colors.white },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.gray100, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  title: { ...Typography.h3, color: Colors.text },
  listContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  card: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md, ...Shadow.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary + '15', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  avatarText: { ...Typography.h4, fontWeight: '700', color: Colors.primary },
  cardInfo: { flex: 1 },
  employerName: { ...Typography.bodySmall, fontWeight: '600', color: Colors.text },
  starsRow: { flexDirection: 'row', gap: 2, marginTop: 4 },
  rating: { ...Typography.h4, color: '#FFB300', fontWeight: '700' },
  comment: { ...Typography.bodySmall, color: Colors.textSecondary, fontStyle: 'italic', lineHeight: 20, marginBottom: Spacing.sm },
  date: { ...Typography.caption, color: Colors.textLight },
});
