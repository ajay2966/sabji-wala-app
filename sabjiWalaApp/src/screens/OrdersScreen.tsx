import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserStackParamList } from '../navigation/RootNavigator';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import OrderCard from '../components/OrderCard';
import EmptyState from '../components/EmptyState';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function OrdersScreen() {
  const { orders, session, users, logout, refreshOrders } = useApp();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<UserStackParamList>>();
  const ownOrders = orders.filter(order => order.userId === session);
  const user = users.find(item => item.id === session);
  return (
    <View style={styles.safe}>
      <FlatList
        data={ownOrders}
        keyExtractor={item => String(item.id)}
        refreshing={false}
        onRefresh={refreshOrders}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
        ]}
        ListHeaderComponent={
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Your orders</Text>
              <Text style={styles.subtitle}>{user?.name}</Text>
            </View>
            <Pressable onPress={logout}>
              <Text style={styles.logout}>Logout</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => navigation.navigate('OrderDetail', { order: item })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No orders yet"
            message="Your freshly picked vegetables will show up here."
            action={() => navigation.navigate('Home' as never)}
          />
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, flexGrow: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 3 },
  logout: { color: colors.primary, fontWeight: '800', padding: 8 },
});
