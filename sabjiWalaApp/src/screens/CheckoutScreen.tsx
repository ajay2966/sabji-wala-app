import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../navigation/RootNavigator';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { DELIVERY_FEE } from '../config/constants';
import Button from '../components/Button';
export default function CheckoutScreen({
  navigation,
}: NativeStackScreenProps<UserStackParamList, 'Checkout'>) {
  const { cart, products, address: savedAddress, placeOrder } = useApp();
  const [address, setAddress] = useState(savedAddress);
  const [slot, setSlot] = useState<'Morning' | 'Evening'>('Morning');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      (products.find(product => product.id === item.productId)?.pricePerKg ||
        0) *
        item.qtyKg,
    0,
  );
  const submit = async () => {
    if (!address.trim()) return setError('Address is required');
    setLoading(true);
    try {
      await placeOrder(address.trim(), slot);
      navigation.navigate('Tabs', { screen: 'Orders' } as never);
      Alert.alert('Order placed', 'Your order is waiting for approval.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Delivery details</Text>
        <Text style={styles.label}>Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          multiline
          placeholder="House no, street, area"
          placeholderTextColor={colors.muted}
          style={[styles.input, error && styles.errorInput]}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.label}>Delivery slot</Text>
        <View style={styles.slots}>
          {(['Morning', 'Evening'] as const).map(item => (
            <Pressable
              key={item}
              onPress={() => setSlot(item)}
              style={[styles.slot, slot === item && styles.activeSlot]}
            >
              <Text
                style={[styles.slotText, slot === item && styles.activeText]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.label}>Payment</Text>
        <View style={styles.payment}>
          <Text style={{ fontSize: 24 }}>💵</Text>
          <View>
            <Text style={styles.payTitle}>Cash on delivery</Text>
            <Text style={styles.muted}>Pay when your order arrives</Text>
          </View>
        </View>
        <Text style={styles.heading}>Order summary</Text>
        {cart.map(item => (
          <View key={item.productId} style={styles.summaryLine}>
            <Text style={styles.muted}>
              {products.find(product => product.id === item.productId)?.name} ×{' '}
              {item.qtyKg} kg
            </Text>
            <Text style={styles.value}>
              ₹
              {(products.find(product => product.id === item.productId)
                ?.pricePerKg || 0) * item.qtyKg}
            </Text>
          </View>
        ))}
        <View style={styles.summaryLine}>
          <Text style={styles.muted}>Delivery fee</Text>
          <Text style={styles.value}>₹{DELIVERY_FEE}</Text>
        </View>
        <View style={styles.summaryLine}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>₹{subtotal + DELIVERY_FEE}</Text>
        </View>
        <Text style={styles.note}>
          Your order will be confirmed after admin approval.
        </Text>
        <Button title="Place order" onPress={submit} loading={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18 },
  heading: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 14,
    marginTop: 8,
  },
  label: {
    color: colors.text,
    fontWeight: '800',
    marginBottom: 7,
    marginTop: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    minHeight: 90,
    padding: 14,
    color: colors.text,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  errorInput: { borderColor: colors.danger },
  error: { color: colors.danger, fontSize: 12, marginTop: 4 },
  slots: { flexDirection: 'row', marginBottom: 14 },
  slot: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 13,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  activeSlot: { backgroundColor: colors.primary, borderColor: colors.primary },
  slotText: { color: colors.muted, fontWeight: '700' },
  activeText: { color: colors.white },
  payment: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  payTitle: { color: colors.text, fontWeight: '800' },
  muted: { color: colors.muted },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  value: { color: colors.text, fontWeight: '700' },
  totalLabel: { color: colors.text, fontWeight: '800', fontSize: 18 },
  total: { color: colors.primary, fontWeight: '800', fontSize: 18 },
  note: {
    backgroundColor: colors.hintBg,
    color: colors.hintText,
    padding: 12,
    borderRadius: 10,
    marginVertical: 14,
    lineHeight: 19,
  },
});
