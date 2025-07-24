import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { useAuth } from '../auth/AuthContext';
import LoadingScreen from './LoadingScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { getFriendlyError } from '../auth/authUtils'; // Adjust path if needed

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { signIn, googleSignIn, loading: authLoading } = useAuth();

const handleLogin = async () => {
  if (!email || !password) {
    Toast.show({
      type: 'error',
      text1: 'Missing Fields',
      text2: 'Please fill all required fields',
      visibilityTime: 3000,
    });
    return;
  }

  try {
    setIsProcessing(true);
    await signIn(email, password);

    Toast.show({
      type: 'success',
      text1: 'Successfully Logged In',
      visibilityTime: 3000,
    });
  } catch (error) {
    const friendlyMessage = getFriendlyError(error);
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: friendlyMessage,
      visibilityTime: 3000,
    });
  } finally {
    setIsProcessing(false);
  }
};

const handleGoogleLogin = async () => {
  try {
    setIsProcessing(true);
    await googleSignIn();
  } catch (error) {
    const friendlyMessage = getFriendlyError(error);
    Toast.show({
      type: 'error',
      text1: 'Google Login Failed',
      text2: friendlyMessage,
      visibilityTime: 3000,
    });
  } finally {
    setIsProcessing(false);
  }
};

  if (isProcessing || authLoading) {
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
          d={`M0,100 C150,200 ${
            width - 150
          },0 ${width},100 L${width},200 L0,200 Z`}
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
          <Text style={styles.title}>Welcome Back</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon
              name="email-outline"
              size={20}
              color="rgba(255,255,255,0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isProcessing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="lock-outline"
              size={20}
              color="rgba(255,255,255,0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              editable={!isProcessing}
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              disabled={isProcessing}
            >
              <Icon
                name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="rgba(255,255,255,0.7)"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              isProcessing && styles.processingButton,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              {isProcessing ? 'Processing...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.googleButton, isProcessing && styles.disabledButton]}
            onPress={handleGoogleLogin}
            disabled={isProcessing}
          >
            <Icon
              name="google"
              size={20}
              color="#DB4437"
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Sign In with Google</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              disabled={isProcessing}
            >
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

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
  loginButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#4C6EF5',
    fontWeight: '600',
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  googleIcon: {
    marginRight: 12,
  },
  googleButtonText: {
    color: '#DB4437',
    fontWeight: '600',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  signupLink: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default LoginScreen;
