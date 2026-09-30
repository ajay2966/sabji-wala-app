import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import Button from './Button';
export default function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: () => void;
}) {
  return (
    <View style={styles.box}>
      <Text style={styles.emoji}>🥕</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {action ? (
        <Button title="Browse vegetables" onPress={action} secondary />
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
  },
  emoji: { fontSize: 42 },
  title: { color: colors.text, fontSize: 20, fontWeight: '800', marginTop: 10 },
  message: { color: colors.muted, textAlign: 'center', marginVertical: 8 },
});
