import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
const Tab = createBottomTabNavigator();
export default function UserTabs() {
  const { cart } = useApp();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: { fontFamily: 'sans-serif-medium' },
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: () => <Text>⌂</Text> }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: () => <Text>🛒</Text>,
          tabBarBadge: cart.length ? cart.length : undefined,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ tabBarIcon: () => <Text>▣</Text> }}
      />
    </Tab.Navigator>
  );
}
