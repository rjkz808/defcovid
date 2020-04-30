import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import SosScreen from '../screens/SosScreen';

const SosStack = createStackNavigator();

export default function SosNavigator() {
  return (
    <SosStack.Navigator>
      <SosStack.Screen
        name="SOS"
        component={SosScreen}
        options={{ header: () => <Header title="SOS - first aid" /> }}
      />
    </SosStack.Navigator>
  );
}
