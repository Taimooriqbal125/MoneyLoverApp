import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const { resetPassword, loading } = useAuth();

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert('Success', 'Password reset link sent to your email');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send reset email');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background SVG */}
      <Svg style={StyleSheet.absoluteFillObject}>
        <Rect width="100%" height="100%" fill="white" />
        <Circle cx="10%" cy="30%" r="60" fill="#F5F5F5" />
        <Circle cx="90%" cy="60%" r="80" fill="#F5F5F5" />
        <Path
          d="M0,100 Q50,50 100,100 T200,100 T300,100"
          fill="none"
          stroke="#F0F0F0"
          strokeWidth="2"
        />
      </Svg>

      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleReset}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Check your spam folder if you don't see the email
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: '#4C6EF5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    marginTop: 16,
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default ResetPasswordScreen;