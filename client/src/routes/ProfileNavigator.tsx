import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import ProfileScreen from '../screens/ProfileScreen';

const ProfileStack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ header: () => <Header title="Profile" /> }}
      />
    </ProfileStack.Navigator>
  );
}
