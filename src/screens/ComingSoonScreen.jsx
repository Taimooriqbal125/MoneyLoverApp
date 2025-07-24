import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, Circle, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const ComingSoonScreen = () => {
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

      {/* Content */}
      <View style={styles.content}>
        <Svg width={120} height={120} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="10" fill="#FFD700" />
          <Path 
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            fill="#FFA500" 
          />
        </Svg>

        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>We're working hard on something amazing.</Text>
        <Text style={styles.subtitle}>Stay tuned for updates!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
});

export default ComingSoonScreen;
