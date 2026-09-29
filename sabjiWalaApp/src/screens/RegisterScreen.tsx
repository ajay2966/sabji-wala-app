import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { AuthParamList } from '../navigation/AuthStack';
import Input from '../components/Input';
import Button from '../components/Button';
type Props = NativeStackScreenProps<AuthParamList, 'Register'>;
export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const validMobile = /^[6-9]\d{9}$/.test(mobile);
  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.logo}>🥬</Text>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>
          Fresh vegetables, delivered to your door.
        </Text>
        <Input
          label="Full name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          error={error && !name ? error : undefined}
        />
        <Input
          label="Mobile number"
          value={mobile}
          onChangeText={text => setMobile(text.replace(/\D/g, '').slice(0, 10))}
          keyboardType="number-pad"
          placeholder="10-digit mobile number"
          error={error && !validMobile ? error : undefined}
        />
        <Button
          title="Send OTP"
          onPress={() => {
            if (!name.trim()) setError('Please enter your full name');
            else if (!validMobile)
              setError('Enter a valid 10-digit mobile number');
            else {
              setError('');
              navigation.navigate('Otp', {
                mode: 'register',
                name: name.trim(),
                mobile,
              });
            }
          }}
          secondary
        />
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            Already have an account?{' '}
            <Text style={{ fontWeight: '800' }}>Login</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingTop: 64 },
  logo: { fontSize: 54 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: 12 },
  subtitle: { color: colors.muted, marginVertical: 10, fontSize: 16 },
  link: {
    textAlign: 'center',
    color: colors.primary,
    padding: 20,
    fontSize: 15,
  },
});
