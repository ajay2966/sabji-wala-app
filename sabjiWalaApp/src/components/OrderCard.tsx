import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Order } from '../types/models';
import StatusChip from './StatusChip';
export default function OrderCard({
  order,
  onPress,
}: {
  order: Order;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.id}>Order #{order.id}</Text>
        <StatusChip status={order.status} />
      </View>
      <Text style={styles.items}>
        {order.items.map(item => `${item.name} × ${item.qtyKg}kg`).join(', ')}
      </Text>
      <View style={styles.bottom}>
        <Text style={styles.date}>
          {new Date(order.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.total}>₹{order.total}</Text>
      </View>
      {order.status === 'rejected' && order.rejectReason ? (
        <Text style={styles.reason}>{order.rejectReason}</Text>
      ) : null}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  id: { color: colors.text, fontWeight: '800', fontSize: 16 },
  items: { color: colors.muted, lineHeight: 20, marginVertical: 12 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between' },
  date: { color: colors.muted },
  total: { color: colors.primary, fontWeight: '800' },
  reason: { color: colors.danger, marginTop: 10, fontSize: 13 },
});
