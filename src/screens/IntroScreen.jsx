import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const IntroScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Svg height={height} width={width} style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0" stopColor="#4C6EF5" stopOpacity="1" />
            <Stop offset="1" stopColor="#845EF7" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width={width} height={height} fill="url(#grad)" />
      </Svg>

      {/* Content */}
      <View style={styles.content}>
        {/* Logo/Illustration would go here */}
        <Svg width={200} height={200} viewBox="0 0 24 24">
          {/* Your custom SVG illustration */}
          <Rect x="2" y="4" width="20" height="16" rx="2" fill="#fff" />
          <Rect x="6" y="8" width="12" height="3" rx="1.5" fill="#4C6EF5" />
          <Rect x="6" y="14" width="8" height="2" rx="1" fill="#4C6EF5" />
        </Svg>

        <Text style={styles.title}>Your finances</Text>
        <Text style={styles.title}>in one place.</Text>

        <Text style={styles.subtitle}>
          Manage your finances anywhere, anytime.
        </Text>
        <Text style={styles.subtitle}>
          Spend money on bills, and shopping
        </Text>
        <Text style={styles.subtitle}>and moniter anywhere.</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('AdsScreen')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 48,
  },
  primaryButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#4C6EF5',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default IntroScreen;