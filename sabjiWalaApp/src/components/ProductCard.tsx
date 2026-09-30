import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Product } from '../types/models';
export default function ProductCard({
  product,
  onPress,
  onAdd,
}: {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      {product.imageSource && !imageFailed ? (
        <Image
          source={product.imageSource}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Text style={styles.emoji}>{product.emoji}</Text>
      )}
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.pricePerKg}/kg</Text>
      <View style={styles.bottom}>
        <Text style={styles.stock}>
          {product.inStock ? 'Fresh today' : 'Out of stock'}
        </Text>
        <Pressable
          onPress={onAdd}
          disabled={!product.inStock}
          style={styles.add}
        >
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    margin: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: '100%', height: 106, borderRadius: 12, marginBottom: 10 },
  emoji: { fontSize: 48, marginBottom: 8, height: 106 },
  name: { color: colors.text, fontWeight: '800', fontSize: 16 },
  price: { color: colors.primary, fontWeight: '700', marginTop: 4 },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  stock: { fontSize: 11, color: colors.muted },
  add: {
    backgroundColor: colors.orange,
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: { color: colors.white, fontSize: 26, lineHeight: 28 },
});
