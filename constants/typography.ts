import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'Poppins',
  android: 'Poppins',
  default: 'System',
}) as string;

const fontFamilyBold = Platform.select({
  ios: 'Poppins-Bold',
  android: 'Poppins-Bold',
  default: 'System',
}) as string;

const fontFamilySemiBold = Platform.select({
  ios: 'Poppins-SemiBold',
  android: 'Poppins-SemiBold',
  default: 'System',
}) as string;

const fontFamilyMedium = Platform.select({
  ios: 'Poppins-Medium',
  android: 'Poppins-Medium',
  default: 'System',
}) as string;

const fontFamilyLight = Platform.select({
  ios: 'Poppins-Light',
  android: 'Poppins-Light',
  default: 'System',
}) as string;

export const Typography = {
  h1: {
    fontFamily: fontFamilyBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fontFamilyBold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: fontFamilySemiBold,
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontFamily: fontFamilySemiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  h5: {
    fontFamily: fontFamilyMedium,
    fontSize: 18,
    lineHeight: 26,
  },
  body: {
    fontFamily: fontFamily,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: fontFamily,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: fontFamilyLight,
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontFamily: fontFamilySemiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  buttonSmall: {
    fontFamily: fontFamilyMedium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  label: {
    fontFamily: fontFamilyMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  tag: {
    fontFamily: fontFamily,
    fontSize: 11,
    lineHeight: 16,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};

export const BorderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
};
