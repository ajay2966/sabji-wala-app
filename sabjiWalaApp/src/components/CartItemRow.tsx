import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Product } from '../types/models';
export default function CartItemRow({
  product,
  qty,
  onChange,
}: {
  product: Product;
  qty: number;
  onChange: (qty: number) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.emoji}>{product.emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.pricePerKg}/kg</Text>
      </View>
      <View style={styles.controls}>
        <Pressable onPress={() => onChange(qty - 0.5)} style={styles.control}>
          <Text>-</Text>
        </Pressable>
        <Text style={styles.qty}>{qty} kg</Text>
        <Pressable
          onPress={() => onChange(qty + 0.5)}
          style={[styles.control, styles.plus]}
        >
          <Text style={{ color: colors.white }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emoji: { fontSize: 34 },
  info: { flex: 1, marginLeft: 12 },
  name: { color: colors.text, fontSize: 16, fontWeight: '800' },
  price: { color: colors.muted, marginTop: 4 },
  controls: { flexDirection: 'row', alignItems: 'center' },
  control: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
  },
  plus: { backgroundColor: colors.orange },
  qty: { marginHorizontal: 7, color: colors.text, fontWeight: '700' },
});
