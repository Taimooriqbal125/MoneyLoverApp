import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import IntroScreen from '../screens/IntroScreen';
import AdsScreen from '../screens/AdsScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
  <Stack.Navigator      initialRouteName="IntroScreen"
      screenOptions={{ headerShown: false }}>
     <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="ComingSoonScreen" component={ComingSoonScreen} />
    <Stack.Screen name="AdsScreen" component={AdsScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
  );
}