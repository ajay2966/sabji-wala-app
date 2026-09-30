import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../navigation/RootNavigator';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import Button from '../components/Button';
export default function ProductScreen({
  route,
}: NativeStackScreenProps<UserStackParamList, 'Product'>) {
  const { product } = route.params;
  const { addToCart } = useApp();
  const [qty, setQty] = useState(0.5);
  const total = product.pricePerKg * qty;
  return (
    <View style={styles.safe}>
      <View style={styles.hero}>
        {product.imageSource ? (
          <Image
            source={product.imageSource}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.emoji}>{product.emoji}</Text>
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.pricePerKg} per kg</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.label}>Quantity</Text>
        <View style={styles.quantity}>
          <Pressable
            onPress={() => setQty(Math.max(0.5, qty - 0.5))}
            style={styles.step}
          >
            <Text>-</Text>
          </Pressable>
          <Text style={styles.qty}>{qty} kg</Text>
          <Pressable
            onPress={() => setQty(qty + 0.5)}
            style={[styles.step, styles.plus]}
          >
            <Text style={{ color: colors.white }}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.total}>
          Total <Text>₹{total}</Text>
        </Text>
        <Button
          title={product.inStock ? 'Add to cart' : 'Out of stock'}
          disabled={!product.inStock}
          onPress={async () => {
            await addToCart(product.id, qty);
            Alert.alert('Added to cart', `${product.name} is in your cart.`);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  hero: {
    height: 250,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },
  emoji: { fontSize: 120 },
  body: { padding: 22 },
  name: { color: colors.text, fontSize: 30, fontWeight: '800' },
  price: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 17,
    marginTop: 5,
  },
  description: { color: colors.muted, lineHeight: 22, marginVertical: 18 },
  label: { color: colors.text, fontWeight: '800', marginBottom: 10 },
  quantity: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  step: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: { backgroundColor: colors.orange, borderColor: colors.orange },
  qty: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginHorizontal: 20,
  },
  total: { color: colors.muted, fontSize: 16, marginBottom: 14 },
  bodyTotal: { color: colors.text },
});
