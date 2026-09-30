import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';
export default function Input({ 
  label,
  error,
  compact = false,
  ...props
}: React.ComponentProps<typeof TextInput> & {
  label: string;
  error?: string;
  compact?: boolean;
}) {
  return (
    <View style={[styles.wrap, compact && styles.compactWrap]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        {...props}
        style={[styles.input, compact && styles.compactInput, error && styles.errorInput]}
      />
      <>{error ? <Text style={styles.error}>{error}</Text> : null}</>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  compactWrap: { marginBottom: 10 },
  label: { color: colors.text, fontWeight: '700', marginBottom: 7 },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
  },
  errorInput: { borderColor: colors.danger },
  error: { color: colors.danger, marginTop: 5, fontSize: 12 },
  compactInput: { minHeight: 44, paddingVertical: 9 },
});
