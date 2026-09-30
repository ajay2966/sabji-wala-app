import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import CartItemRow from '../components/CartItemRow';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import { DELIVERY_FEE } from '../config/constants';
import { colors } from '../theme/colors';
import { UserStackParamList } from '../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function CartScreen() {
  const { cart, products, updateCart } = useApp();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<UserStackParamList>>();
  const rows = cart
    .map(item => ({
      item,
      product: products.find(product => product.id === item.productId)!,
    }))
    .filter(row => row.product);
  const subtotal = rows.reduce(
    (sum, row) => sum + row.product.pricePerKg * row.item.qtyKg,
    0,
  );
  if (!rows.length)
    return (
      <View style={styles.safe}>
        <EmptyState
          title="Your cart is empty"
          message="Pick something fresh for your next meal."
          action={() => navigation.navigate('Home' as never)}
        />
      </View>
    );
  return (
    <ScrollView
      style={styles.safe}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 96 },
      ]}
    >
      <Text style={styles.title}>Your cart</Text>
      {rows.map(row => (
        <CartItemRow
          key={row.item.productId}
          product={row.product}
          qty={row.item.qtyKg}
          onChange={qty => updateCart(row.item.productId, qty)}
        />
      ))}
      <View style={styles.summary}>
        <Line label="Subtotal" value={subtotal} />
        <Line label="Delivery fee" value={DELIVERY_FEE} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>₹{subtotal + DELIVERY_FEE}</Text>
        </View>
      </View>
      <Button
        title="Go to checkout"
        onPress={() => navigation.navigate('Checkout')}
      />
    </ScrollView>
  );
}
function Line({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.line}>
      <Text style={styles.muted}>{label}</Text>
      <Text style={styles.value}>₹{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16 },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
  },
  summary: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  muted: { color: colors.muted },
  value: { color: colors.text, fontWeight: '700' },
  totalRow: {
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: { color: colors.text, fontWeight: '800', fontSize: 18 },
  total: { color: colors.primary, fontWeight: '800', fontSize: 18 },
});
