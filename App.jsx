import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddExpense from './src/screens/AddExpense'
import Home from './src/screens/Home'
import MainNavigator from './src/navigation/MainNavigator'
import { AuthProvider } from './src/auth/AuthContext'
import LoginScreen from './src/screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './src/Redux/store/store'
import Toast from 'react-native-toast-message'
import { toastConfig } from './src/component/toast-config'


export default function App() {
  return (
     <Provider store={store}>
    <AuthProvider>      
    <View style={{backgroundColor:'white',flex:1}}>
      <MainNavigator/>
      <Toast config={toastConfig} />
    </View>
    </AuthProvider>
</Provider>
  )
}

const styles = StyleSheet.create({})