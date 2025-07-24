import { useAuth } from '../auth/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from '../screens/LoadingScreen';
import { BottomTabsNavigator } from '../navigation/BottomTabsNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import StackNavigator from './StackNavigation';

const MainNavigator = () => {
  
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <StackNavigator /> : <AuthNavigator/>}
    </NavigationContainer>
  );
};

export default MainNavigator;
