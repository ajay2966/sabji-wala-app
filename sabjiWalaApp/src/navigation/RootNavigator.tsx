import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import AuthStack from './AuthStack';
import UserTabs from './UserTabs';
import ProductScreen from '../screens/ProductScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import { colors } from '../theme/colors';
import { Product, Order } from '../types/models';

export type UserStackParamList = {
  Tabs: undefined;
  Product: { product: Product };
  Checkout: undefined;
  OrderDetail: { order: Order };
};
const Stack = createNativeStackNavigator<UserStackParamList>();
export default function RootNavigator() {
  const { hydrated, session } = useApp();
  if (!hydrated)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  return (
    <NavigationContainer>
      <>
        {session ? (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: colors.primary,
              headerTitleStyle: { fontFamily: 'sans-serif-medium' },
            }}
          >
            <Stack.Screen
              name="Tabs"
              component={UserTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Product"
              component={ProductScreen}
              options={{ title: 'Vegetable' }}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{ title: 'Checkout' }}
            />
            <Stack.Screen
              name="OrderDetail"
              component={OrderDetailScreen}
              options={{ title: 'Order details' }}
            />
          </Stack.Navigator>
        ) : (
          <AuthStack />
        )}
      </>
    </NavigationContainer>
  );
}
