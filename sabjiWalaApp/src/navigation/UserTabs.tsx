import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
const Tab = createBottomTabNavigator();
function TabIcon({ symbol, color }: { symbol: string; color: string }) {
  return <Text style={{ color, fontSize: 22, lineHeight: 24 }}>{symbol}</Text>;
}
export default function UserTabs() {
  const { cart } = useApp();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontFamily: 'sans-serif-medium',
          fontSize: 12,
          marginBottom: 4,
        },
        tabBarIconStyle: { marginTop: 5 },
        tabBarStyle: {
          height: 68,
          paddingTop: 3,
          borderTopColor: colors.border,
          backgroundColor: colors.white,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon symbol="⌂" color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon symbol="▱" color={color} />,
          tabBarBadge: cart.length ? cart.length : undefined,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon symbol="▣" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
