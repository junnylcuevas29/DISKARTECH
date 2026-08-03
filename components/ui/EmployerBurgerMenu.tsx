import Avatar from '@/components/ui/Avatar';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { registerEmployerData } from '@/data/employerProfile';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface EmployerBurgerMenuProps {
  visible: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: 'work', label: 'Post a Job', route: '/employer/job-posting' },
  { icon: 'people', label: 'Applicants', route: '/employer/(tabs)/applicants' },
  { icon: 'verified', label: 'Verification', route: '/employer/verification-status' },
  { icon: 'settings', label: 'Settings', route: '/common/settings' },
  { icon: 'help-outline', label: 'Help Center', route: '#' },
  { icon: 'info-outline', label: 'About DiskarTech', route: '#' },
  { icon: 'logout', label: 'Logout', route: '/auth/welcome', danger: true },
];

export default function EmployerBurgerMenu({ visible, onClose }: EmployerBurgerMenuProps) {
  const translateX = useRef(new Animated.Value(-320)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, { toValue: 0, duration: 280, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 280, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, { toValue: -320, duration: 220, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, translateX, opacity]);

  const handleItemPress = (route: string) => {
    onClose();
    setTimeout(() => {
      if (route === '/auth/welcome') {
        router.replace(route as any);
      } else if (route !== '#') {
        router.push(route as any);
      }
    }, 250);
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.root}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, { opacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        {/* Drawer */}
        <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.brand}>DiskarTech</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <MaterialIcons name="close" size={22} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.userRow}
              onPress={() => {
                onClose();
                setTimeout(() => router.push('/employer/(tabs)/profile'), 250);
              }}
            >
              <Avatar
                uri="https://ui-avatars.com/api/?name=McDonalds&background=D32F2F&color=fff&size=200"
                name={registerEmployerData.businessName}
                size={56}
                verified={registerEmployerData.verificationStatus === 'verified'}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{registerEmployerData.businessName}</Text>
                <Text style={styles.userEmail}>{registerEmployerData.email}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Menu items */}
          <View style={styles.menu}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, index === menuItems.length - 1 && styles.menuItemLast]}
                onPress={() => handleItemPress(item.route)}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIcon, item.danger && styles.menuIconDanger]}>
                  <MaterialIcons
                    name={item.icon as any}
                    size={22}
                    color={item.danger ? Colors.error : Colors.primary}
                  />
                </View>
                <Text style={[styles.menuLabel, item.danger && { color: Colors.error }]}>
                  {item.label}
                </Text>
                <MaterialIcons name="chevron-right" size={22} color={Colors.gray400} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Version 1.0.0</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: Colors.white,
    borderTopRightRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    ...Shadow.lg,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  brand: {
    ...Typography.h4,
    color: Colors.white,
    fontWeight: '700',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
  userEmail: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  menu: {
    flex: 1,
    paddingTop: Spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
    gap: Spacing.md,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconDanger: {
    backgroundColor: Colors.error + '10',
  },
  menuLabel: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
  },
  footerText: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
  },
});
