import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import HomeScreen from '../screens/HomeScreen';
import ActionScreen from '../screens/ActionScreen';
import RiskScreen from '../screens/RiskScreen';

const HomeStack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => <Header title="Antivirus Tracker" /> }}
      />

      <HomeStack.Screen
        name="Actions"
        component={ActionScreen}
        options={{
          header: ({ navigation }) => (
            <Header hasBack onBack={navigation.goBack} title="Select action" />
          ),
        }}
      />

      <HomeStack.Screen
        name="Risks"
        component={RiskScreen}
        options={{
          header: ({ navigation }) => (
            <Header hasBack onBack={navigation.goBack} title="Select risk" />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}
