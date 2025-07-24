import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { useAuth } from '../auth/AuthContext';
import LoadingScreen from './LoadingScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const { signUp, loading } = useAuth();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await signUp(email, password);
    } catch (error) {
      const errorMessage = error?.code 
        ? getAuthErrorMessage(error.code) 
        : 'Signup failed. Please try again.';
      Alert.alert('Signup Error', errorMessage);
    }
  };

  const getAuthErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered';
      case 'auth/invalid-email':
        return 'Please enter a valid email';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      default:
        return 'Signup failed. Please try again.';
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <Svg height={height} width={width} style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0" stopColor="#4C6EF5" stopOpacity="1" />
            <Stop offset="1" stopColor="#845EF7" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width={width} height={height} fill="url(#grad)" />
      </Svg>

      {/* Decorative SVG Wave */}
      <Svg
        width={width}
        height={200}
        viewBox={`0 0 ${width} 200`}
        style={styles.wave}
      >
        <Defs>
          <LinearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0" stopColor="#4C6EF5" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#845EF7" stopOpacity="0.2" />
          </LinearGradient>
        </Defs>
        <Path
          d={`M0,100 C150,200 ${width - 150},0 ${width},100 L${width},200 L0,200 Z`}
          fill="url(#waveGrad)"
        />
      </Svg>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.logoContainer}>
          <Svg width={120} height={120} viewBox="0 0 24 24">
            <Rect x="2" y="4" width="20" height="16" rx="2" fill="#fff" />
            <Rect x="6" y="8" width="12" height="3" rx="1.5" fill="#4C6EF5" />
            <Rect x="6" y="14" width="8" height="2" rx="1" fill="#4C6EF5" />
          </Svg>
          <Text style={styles.title}>Create Account</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="email-outline" size={20} color="rgba(255,255,255,0.7)" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-outline" size={20} color="rgba(255,255,255,0.7)" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              editable={!loading}
            />
            <TouchableOpacity 
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              disabled={loading}
            >
              <Icon 
                name={secureTextEntry ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="rgba(255,255,255,0.7)" 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-outline" size={20} color="rgba(255,255,255,0.7)" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={confirmSecureTextEntry}
              editable={!loading}
            />
            <TouchableOpacity 
              onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
              disabled={loading}
            >
              <Icon 
                name={confirmSecureTextEntry ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="rgba(255,255,255,0.7)" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.signupButton, loading && styles.disabledButton]}
            onPress={handleSignup}
            disabled={loading || !email || !password || !confirmPassword}
          >
            <Text style={styles.signupButtonText}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// Reuse the same styles from LoginScreen with minor additions
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wave: {
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginTop: 16,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'white',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: '#4C6EF5',
    fontWeight: '600',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  loginLink: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default SignupScreen;