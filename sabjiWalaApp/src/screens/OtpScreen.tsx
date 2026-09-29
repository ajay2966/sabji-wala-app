import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FIXED_OTP } from '../config/constants';
import { useApp } from '../context/AppContext';
import { AuthParamList } from '../navigation/AuthStack';
import { colors } from '../theme/colors';
import Input from '../components/Input';
import Button from '../components/Button';

export default function OtpScreen({
  navigation,
  route,
}: NativeStackScreenProps<AuthParamList, 'Otp'>) {
  const { login, register } = useApp();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { mode, mobile, name } = route.params;

  const verify = async () => {
    if (otp !== FIXED_OTP) return setError('Incorrect OTP');

    if (mode === 'register') {
      const result = await register(name || '', mobile);
      if (result === 'exists') {
        setError('Account already exists, please login');
        return;
      }
    } else {
      const result = await login(mobile);
      if (result === 'missing') {
        setError('No account found, please register');
        return;
      }
    }
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
        <Text style={styles.logo}>🔐</Text>
        <Text style={styles.title}>Verify your mobile</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to +91 {mobile}.
        </Text>
        <Input
          label="OTP"
          value={otp}
          onChangeText={text => setOtp(text.replace(/\D/g, '').slice(0, 6))}
          keyboardType="number-pad"
          placeholder="Enter 6-digit OTP"
          error={error}
          autoFocus
        />
        <Button
          title={
            mode === 'register' ? 'Verify and register' : 'Verify and login'
          }
          onPress={verify}
        />
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Use a different mobile number</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingTop: 72 },
  logo: { fontSize: 54 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: 12 },
  subtitle: {
    color: colors.muted,
    marginVertical: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  link: {
    textAlign: 'center',
    color: colors.primary,
    padding: 20,
    fontSize: 15,
  },
});
