import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import CalendarScreen from '../screens/CalendarScreen';

const CalendarStack = createStackNavigator();

export default function CalendarNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ header: () => <Header title="Personal calendar" /> }}
      />
    </CalendarStack.Navigator>
  );
}
