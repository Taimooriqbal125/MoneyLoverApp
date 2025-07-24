import { getAuth, 
  onAuthStateChanged as firebaseOnAuthStateChanged,
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as firebaseSignIn,
  signOut as firebaseSignOut,
  sendPasswordResetEmail as firebaseSendReset,
  GoogleAuthProvider,
  signInWithCredential
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const auth = getAuth();

// Configure Google Sign-In 
GoogleSignin.configure({
  webClientId: '179884179331-o5k8bcl9ban27om584lml155fh43ksv1.apps.googleusercontent.com',
  offlineAccess: false,
});

// Auth State Listener (FIXED)
export const onAuthStateChanged = (callback) => {
  return firebaseOnAuthStateChanged(auth, callback);
};

// Email/Password Auth
export const createUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await firebaseCreateUser(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await firebaseSignIn(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw {
      message: error.message,
      code: error.code,
    };
  }
};


// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    if (!idToken) throw new Error('Google Sign-In failed: no idToken');

    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } catch (error) {
    console.log('🔴 Google Sign-In Error:', error);
    throw error;
  }
};


// Other Auth Methods
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    await firebaseSendReset(auth, email);
  } catch (error) {
    throw error;
  }
};