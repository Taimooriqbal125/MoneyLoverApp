import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoadingScreen = ({ message, color = '#9d00ffff' }) => {
  // Animation refs - ALL useNativeDriver compatible
  const glowAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const trailAnim = useRef(new Animated.Value(0)).current;

  // Trail dots configuration
  const trailDots = Array(8).fill(0);

  useEffect(() => {
    // Main glow pulse (must be non-native due to shadowOpacity)
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false, // Must be false for shadow properties
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Background pulse (can be native)
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    // Trail animation (can be native)
    Animated.loop(
      Animated.timing(trailAnim, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Only create interpolations that use the same driver as their parent
  const glowInterpolation = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Text glow uses non-native animation
  const textGlow = {
    textShadowColor: color,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: glowInterpolation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 15],
    }),
  };

  return (
    <View style={[styles.container, { backgroundColor: '#dddee1ff' }]}>
      {/* Center icon with glow (non-native) */}
      <Animated.View style={[
        styles.iconContainer,
        {
          shadowColor: color,
          shadowOpacity: glowInterpolation,
          shadowRadius: 20,
        }
      ]}>
        <Icon name="infinity" size={60} color={color} />
      </Animated.View>

      {/* Trail dots (native-driven) */}
      <View style={styles.trailContainer}>
        {trailDots.map((_, i) => {
          const startPos = i * 0.125;
          return (
            <Animated.View
              key={i}
              style={[
                styles.trailDot,
                {
                  backgroundColor: color,
                  opacity: trailAnim.interpolate({
                    inputRange: [
                      Math.max(0, startPos - 0.01),
                      startPos,
                      startPos + 0.0625,
                      startPos + 0.125,
                      Math.min(1, startPos + 0.126)
                    ],
                    outputRange: [0, 0, 1, 0.5, 0],
                    extrapolate: 'clamp'
                  }),
                  transform: [
                    { rotate: `${i * 45}deg` },
                    { translateX: 40 },
                    {
                      scale: trailAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.2],
                        extrapolate: 'clamp'
                      })
                    }
                  ],
                },
              ]}
            />
          );
        })}
      </View>

      {/* Glowing text (non-native) */}
      {message && (
        <Animated.Text style={[styles.text, textGlow]}>
          {message}
        </Animated.Text>
      )}

      {/* Floating particles (native-driven) */}
      <View style={styles.particles}>
        {[...Array(12)].map((_, i) => {
          const randY = Math.random() * 30 - 15;
          const randX = Math.random() * 30 - 15;
          
          return (
            <Animated.View
              key={i}
              style={[
                styles.particle,
                {
                  backgroundColor: color,
                  opacity: pulseAnim.interpolate({
                    inputRange: [1, 1.2],
                    outputRange: [0.1, 0.4],
                    extrapolate: 'clamp'
                  }),
                  transform: [
                    {
                      translateY: pulseAnim.interpolate({
                        inputRange: [1, 1.2],
                        outputRange: [0, randY],
                        extrapolate: 'clamp'
                      }),
                    },
                    {
                      translateX: pulseAnim.interpolate({
                        inputRange: [1, 1.2],
                        outputRange: [0, randX],
                        extrapolate: 'clamp'
                      }),
                    },
                  ],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
    elevation: 5,
  },
  text: {
    marginTop: 40,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
  trailContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
  trailDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    left: 40,
    top: 40,
  },
  particles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  },
});

export default LoadingScreen;