import auth from '@react-native-firebase/auth';

// Error Handling
export const getFriendlyError = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
          case 'auth/invalid-credential':
      return 'Invalid email or password';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later';
    default:
      return 'An error occurred. Please try again';
  }
};

// User Helpers
export const getCurrentUser = () => {
  return auth().currentUser;
};

export const isUserVerified = () => {
  const user = getCurrentUser();
  return user ? user.emailVerified : false;
};

export const formatUserProfile = (user) => {
  if (!user) return null;
  
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || 'Anonymous',
    photoURL: user.photoURL || null,
    provider: user.providerData[0]?.providerId || 'email',
    emailVerified: user.emailVerified
  };
};

// Validation Helpers
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};