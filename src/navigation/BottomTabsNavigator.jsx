import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import AddExpense from '../screens/AddExpense';
import Profile from '../screens/Profile';
import IntroScreen from '../screens/IntroScreen';


const Tab = createBottomTabNavigator();

function animateTab(tabAnim, focused) {
  Animated.timing(tabAnim, {
    toValue: focused ? 105 : 50,
    duration: 450,
    useNativeDriver: false,
  }).start();
}

function CustomTabBar({ state, descriptors, navigation }) {
  const homeAnim = useRef(new Animated.Value(50)).current;
  const profileAnim = useRef(new Animated.Value(50)).current;
  const AddAnim = useRef(new Animated.Value(50)).current;
  const settingAnim = useRef(new Animated.Value(50)).current;

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          let iconName = 'ellipse-outline';
          let animWidth = homeAnim;

          if (route.name === 'Home') {
            iconName = focused ? 'analytics' : 'analytics-outline';
            animWidth = homeAnim;
            animateTab(homeAnim, focused);
          } else if (route.name === 'Add') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            animWidth = profileAnim;
            animateTab(profileAnim, focused);
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
            animWidth = AddAnim;
            animateTab(AddAnim, focused);
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            animWidth = settingAnim;
            animateTab(settingAnim, focused);
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.name}
              activeOpacity={1}
              onPress={onPress}
              style={styles.tabButtonWrapper}
            >
              <Animated.View style={[styles.tabButton, { width: animWidth }]}>
                <View style={styles.iconCircle}>
                  <Ionicons name={iconName} size={20} color="black" />
                </View>
                {focused && <Text style={styles.label}>{route.name}</Text>}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Add" component={AddExpense} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    height: 60,
    borderRadius: 40,
    marginHorizontal: 6,
    marginBottom: 20,
    elevation: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    overflow: 'hidden'
  },
  tabButtonWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 30,
    paddingHorizontal: 5,
    backgroundColor: '#6495ED',
    overflow: 'hidden',
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    marginLeft: 4,
    fontWeight: '600',
    fontSize: 14,
  },
});

export { BottomTabsNavigator };