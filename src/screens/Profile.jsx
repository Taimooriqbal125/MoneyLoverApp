import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthContext';

const Profile = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };
  const handleReset = async () => {
    try {
      navigation.navigate('ResetPassword');
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };
    const handleDelete = () => {
      navigation.navigate('DeleteExpenses');
  };

  const { user, logOut } = useAuth();

  return (
    <View style={styles.container}>
      {/* White background with subtle SVG pattern */}
      <Svg style={StyleSheet.absoluteFillObject}>
        <Rect width="100%" height="100%" fill="white" />

        {/* Decorative circles */}
        <Circle cx="10%" cy="20%" r="60" fill="#F5F5F5" />
        <Circle cx="90%" cy="70%" r="80" fill="#F5F5F5" />

        {/* Abstract path elements */}
        <Path
          d="M0,100 Q50,50 100,100 T200,100 T300,100"
          fill="none"
          stroke="#F0F0F0"
          strokeWidth="2"
        />
      </Svg>

      <View style={styles.content}>
        {/* Profile icon */}
        <View style={styles.profileIcon}>
          <Svg width="80" height="80" viewBox="0 0 24 24">
            <Circle cx="12" cy="8" r="5" fill="#4C6EF5" />
            <Path
              d="M12,14 C8,14 4,16 4,20 L20,20 C20,16 16,14 12,14 Z"
              fill="#4C6EF5"
            />
          </Svg>
        </View>

        {/* User email */}
        <Text style={styles.emailText}>
          {user?.email || 'user@example.com'}
        </Text>

        {/* Logout button */}

        <TouchableOpacity style={styles.logoutButton} onPress={handleDelete}>
          <Text style={styles.logoutText}>Delete Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleReset}>
          <Text style={styles.logoutText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    zIndex: 1, // Brings content above SVG background
  },
  profileIcon: {
    marginBottom: 32,
  },
  emailText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 40,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#4C6EF5',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
