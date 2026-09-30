import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const tabDetails = {
  Home: { label: 'Home', icon: 'home' },
  Cart: { label: 'Cart', icon: 'cart' },
  Orders: { label: 'Orders', icon: 'clipboard-list' },
} as const;

function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { cart } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.wrapper, { bottom: insets.bottom + 10 }]}
      accessibilityRole="tablist"
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const detail = tabDetails[route.name as keyof typeof tabDetails];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title || detail.label;
        const badge = route.name === 'Cart' && cart.length > 0 ? cart.length : 0;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={() =>
              navigation.emit({ type: 'tabLongPress', target: route.key })
            }
            style={({ pressed }) => [
              styles.tab,
              isFocused && styles.tabActive,
              pressed && styles.tabPressed,
            ]}
          >
            <View>
              <MaterialCommunityIcons
                name={
                  isFocused
                    ? detail.icon
                    : (`${detail.icon}-outline` as typeof detail.icon)
                }
                size={23}
                color={isFocused ? colors.white : colors.muted}
              />
              {badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function UserTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 36,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#EEF2EC',
    elevation: 14,
    shadowColor: '#17251B',
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    borderRadius: 28,
  },
  tabActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  tabPressed: { opacity: 0.82 },
  label: {
    color: colors.muted,
    fontFamily: 'sans-serif-medium',
    fontSize: 11,
  },
  labelActive: { color: colors.white, fontWeight: '700' },
  badge: {
    position: 'absolute',
    top: -7,
    right: -12,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: colors.orange,
    borderWidth: 2,
    borderColor: colors.white,
  },
  badgeText: { color: colors.white, fontSize: 9, fontWeight: '800' },
});
