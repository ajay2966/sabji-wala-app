import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { OrderStatus } from '../types/models';
export default function StatusChip({ status }: { status: OrderStatus }) {
  const map = {
    pending: ['Waiting for approval', colors.pendingBg, colors.pendingText],
    confirmed: ['Confirmed', colors.confirmedBg, colors.confirmedText],
    rejected: ['Rejected', colors.rejectedBg, colors.rejectedText],
  } as const;
  const [label, backgroundColor, color] = map[status];
  return <Text style={[styles.chip, { backgroundColor, color }]}>{label}</Text>;
}
const styles = StyleSheet.create({
  chip: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
});
