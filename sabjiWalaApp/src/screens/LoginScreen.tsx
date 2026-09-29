import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resetAppData as clearStorage } from '../services/authService';
import { AuthParamList } from '../navigation/AuthStack';
import { colors } from '../theme/colors';
import Input from '../components/Input';
import Button from '../components/Button';
export default function LoginScreen({
  navigation,
}: NativeStackScreenProps<AuthParamList, 'Login'>) {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const submit = () => {
    if (!/^[6-9]\d{9}$/.test(mobile))
      return setError('Enter a valid 10-digit mobile number');
    setError('');
    navigation.navigate('Otp', { mode: 'login', mobile });
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
        <Text style={styles.logo}>🥕</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Log in to continue your fresh order.
        </Text>
        <Input
          label="Mobile number"
          value={mobile}
          onChangeText={text => setMobile(text.replace(/\D/g, '').slice(0, 10))}
          keyboardType="number-pad"
          placeholder="10-digit mobile number"
          error={error && !/^[6-9]\d{9}$/.test(mobile) ? error : undefined}
        />
        <Button title="Send OTP" onPress={submit} />
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>
            New here?{' '}
            <Text style={{ fontWeight: '800' }}>Create an account</Text>
          </Text>
        </Pressable>
        {__DEV__ ? (
          <Pressable
            onLongPress={() =>
              Alert.alert(
                'Reset app data',
                'Clear all local users, carts and orders?',
                [
                  { text: 'Cancel' },
                  {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                      await clearStorage();
                      Alert.alert(
                        'Reset complete',
                        'Reload the app to start fresh.',
                      );
                    },
                  },
                ],
              )
            }
            style={styles.dev}
          >
            <Text style={styles.devText}>Development build</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingTop: 72 },
  logo: { fontSize: 54 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: 12 },
  subtitle: { color: colors.muted, marginVertical: 10, fontSize: 16 },
  link: {
    textAlign: 'center',
    color: colors.primary,
    padding: 20,
    fontSize: 15,
  },
  dev: { padding: 20, alignItems: 'center' },
  devText: { color: colors.background, fontSize: 1 },
});
