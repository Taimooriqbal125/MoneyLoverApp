import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const AdsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Background Gradient (same as IntroScreen) */}
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
        {/* Premium Feature Illustration */}
        <Svg width={200} height={200} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="10" fill="#FFD700" />
          <Path 
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            fill="#FFA500" 
          />
          <Rect x="6" y="8" width="12" height="2" rx="1" fill="#4C6EF5" />
          <Rect x="6" y="12" width="8" height="2" rx="1" fill="#4C6EF5" />
        </Svg>

        <Text style={styles.title}>Upgrade to Premium</Text>
        <Text style={styles.title}>Unlock More Features</Text>

        <Text style={styles.subtitle}>
          Get access to advanced financial insights,
        </Text>
        <Text style={styles.subtitle}>
          unlimited transactions, and priority
        </Text>
        <Text style={styles.subtitle}>customer support.</Text>

        <View style={styles.featureContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>✓ Ad-free experience</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>✓ Advanced analytics</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>✓ Premium support</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('ComingSoonScreen')} // Or your payment screen
          >
            <Text style={styles.buttonText}>Upgrade Now</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')} // Skip to main app
          >
            <Text style={styles.secondaryButtonText}>Continue Free</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Reuse styles from IntroScreen and extend them
const styles = StyleSheet.create({
  ...StyleSheet.create({
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
      marginTop: 32,
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
  }),
  // Additional styles for AdsScreen
  featureContainer: {
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  featureText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default AdsScreen;