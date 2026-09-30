import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();
function TabIcon({
  name,
  color,
  focused,
}: {
  name: string;
  color: string;
  focused: boolean;
}) {
  return (
    <MaterialCommunityIcons
      name={focused ? name : `${name}-outline`}
      color={color}
      size={23}
    />
  );
}
export default function UserTabs() {
  const { cart } = useApp();
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontFamily: 'sans-serif-medium',
          fontSize: 11,
          marginBottom: 1,
        },
        tabBarIconStyle: { marginTop: 3 },
        tabBarItemStyle: {
          marginHorizontal: 7,
          marginVertical: 6,
          borderRadius: 16,
        },
        tabBarActiveBackgroundColor: colors.mint,
        tabBarStyle: {
          height: 74 + insets.bottom,
          paddingTop: 2,
          paddingBottom: insets.bottom + 5,
          paddingHorizontal: 4,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          backgroundColor: colors.white,
          elevation: 10,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="cart" color={color} focused={focused} />
          ),
          tabBarBadge: cart.length ? cart.length : undefined,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="clipboard-list" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
