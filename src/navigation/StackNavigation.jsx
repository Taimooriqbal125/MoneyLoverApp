import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import IntroScreen from '../screens/IntroScreen';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import DeleteExpenses from '../screens/DeleteExpenses';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={BottomTabsNavigator} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
             <Stack.Screen name="DeleteExpenses" component={DeleteExpenses} />
    </Stack.Navigator>
  );
}
