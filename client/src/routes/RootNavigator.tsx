import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import CalendarNavigator from './CalendarNavigator';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import SosNavigator from './SosNavigator';
import BottomNav from '../components/BottomNav';

const RootTab = createBottomTabNavigator();

export default function RootNavigator() {
  const screens = [
    {
      component: HomeNavigator,
      name: 'Home',
      icon: <Icon name="home" />,
    },
    {
      component: CalendarNavigator,
      name: 'Calendar',
      icon: <Icon name="calendar" />,
    },
    {
      component: SosNavigator,
      name: 'SOS',
      icon: <Icon name="warning" />,
    },
    {
      component: ProfileNavigator,
      name: 'Profile',
      icon: <Icon name="person" />,
    },
  ].map((screen) => (
    <RootTab.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
      options={{ tabBarIcon: () => screen.icon }}
    />
  ));

  return (
    <NavigationContainer>
      <RootTab.Navigator lazy tabBar={BottomNav}>
        {screens}
      </RootTab.Navigator>
    </NavigationContainer>
  );
}
