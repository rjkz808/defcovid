import React from 'react';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import { Ionicons } from '@expo/vector-icons';
import Main from './src/Main';
import { UserContextProvider } from './src/contexts/UserContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <UserContextProvider>
      <Main />
    </UserContextProvider>
  );
}
