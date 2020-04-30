import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import AuthScreen from '../screens/AuthScreen';

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ header: () => <Header title="Create account" /> }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
