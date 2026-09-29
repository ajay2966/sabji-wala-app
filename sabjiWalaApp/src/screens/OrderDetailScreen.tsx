import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';
import StatusChip from '../components/StatusChip';
export default function OrderDetailScreen({
  route,
}: NativeStackScreenProps<UserStackParamList, 'OrderDetail'>) {
  const { order } = route.params;
  return (
    <ScrollView style={styles.safe} contentContainerStyle={styles.content}>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.date}>
            {new Date(order.createdAt).toLocaleString()}
          </Text>
        </View>
        <StatusChip status={order.status} />
      </View>
      <Text style={styles.section}>Items</Text>
      {order.items.map(item => (
        <View style={styles.row} key={item.productId}>
          <Text style={styles.itemName}>
            {item.emoji} {item.name} × {item.qtyKg} kg
          </Text>
          <Text style={styles.value}>₹{item.pricePerKg * item.qtyKg}</Text>
        </View>
      ))}
      <View style={styles.card}>
        <Text style={styles.section}>Delivery</Text>
        <Text style={styles.body}>{order.address}</Text>
        <Text style={styles.body}>Slot: {order.deliverySlot}</Text>
        <Text style={styles.body}>Payment: Cash on delivery</Text>
      </View>
      <View style={styles.summary}>
        <Line label="Subtotal" value={order.subtotal} />
        <Line label="Delivery fee" value={order.deliveryFee} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>₹{order.total}</Text>
        </View>
      </View>
      {order.status === 'rejected' && order.rejectReason ? (
        <Text style={styles.reason}>Reason: {order.rejectReason}</Text>
      ) : null}
    </ScrollView>
  );
}
function Line({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.row}>
      <Text style={styles.body}>{label}</Text>
      <Text style={styles.value}>₹{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: { color: colors.text, fontSize: 25, fontWeight: '800' },
  date: { color: colors.muted, marginTop: 4, fontSize: 12 },
  section: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemName: { color: colors.text, flex: 1 },
  value: { color: colors.text, fontWeight: '700' },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  body: { color: colors.muted, lineHeight: 22 },
  summary: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalRow: {
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingTop: 12,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: { color: colors.text, fontWeight: '800', fontSize: 18 },
  total: { color: colors.primary, fontWeight: '800', fontSize: 18 },
  reason: { color: colors.danger, marginTop: 14 },
});
