import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { colors } from '../theme/colors';
import { UserStackParamList } from '../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const categories = ['All', 'Leafy', 'Roots', 'Fruit veg', 'Fruits'] as const;
export default function HomeScreen() {
  const { products, users, session, addToCart } = useApp();
  const navigation =
    useNavigation<NativeStackNavigationProp<UserStackParamList>>();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const user = users.find(item => item.id === session);
  const filtered = useMemo(
    () =>
      products.filter(
        product =>
          product.name.toLowerCase().includes(search.toLowerCase()) &&
          (category === 'All' || product.category === category),
      ),
    [products, search, category],
  );
  return (
    <View style={styles.safe}>
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Text style={styles.greeting}>
              Hello, {user?.name.split(' ')[0]} 👋
            </Text>
            <Text style={styles.subtitle}>What are you cooking today?</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search vegetables & fruits"
              placeholderTextColor={colors.muted}
              style={styles.search}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}
            >
              {categories.map(item => (
                <Pressable
                  key={item}
                  onPress={() => setCategory(item)}
                  style={[styles.chip, category === item && styles.activeChip]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      category === item && styles.activeText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Text style={styles.section}>Fresh picks</Text>
          </>
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Product', { product: item })}
            onAdd={() => addToCart(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No vegetables match your search.</Text>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: 14 },
  greeting: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 4,
    marginBottom: 18,
  },
  search: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    minHeight: 50,
    paddingHorizontal: 15,
    fontSize: 15,
    color: colors.text,
  },
  chips: { flexDirection: 'row', paddingVertical: 16 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeChip: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.muted, fontWeight: '700', fontSize: 12 },
  activeText: { color: colors.white },
  section: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  empty: { textAlign: 'center', color: colors.muted, padding: 30 },
});
