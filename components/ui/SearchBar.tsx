import { Colors } from '@/constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
  onFilter?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({
  placeholder = 'Search jobs, companies...',
  onSearch,
  onFilter,
  value,
  onChangeText,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focused]}>
      <View style={styles.searchInputContainer}>
        <MaterialIcons name="search" size={22} color={isFocused ? Colors.primary : Colors.gray500} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray400}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="search"
          onSubmitEditing={() => onSearch?.(value || '')}
        />
        {value && (
          <TouchableOpacity onPress={() => onChangeText?.('')}>
            <MaterialIcons name="close" size={20} color={Colors.gray500} />
          </TouchableOpacity>
        )}
      </View>
      {onFilter && (
        <TouchableOpacity onPress={onFilter} style={styles.filterBtn}>
          <MaterialIcons name="tune" size={22} color={Colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  focused: {},
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    height: 48,
    gap: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1.5,
    borderColor: Colors.gray100,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    height: '100%',
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
});

