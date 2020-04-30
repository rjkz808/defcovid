import React from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';

interface NavigationEvent {
  type: string;
  target: string;
  canPreventDefault?: boolean;
}

type TabBarIcon = (
  props?: Partial<{
    focused: boolean;
    color: string;
    size: number;
  }>
) => React.ReactNode;

export interface BottomNavProps {
  state: {
    index: number;
    routes: { key: string; name: string }[];
  };

  descriptors: {
    [key: string]: {
      options: { tabBarIcon: TabBarIcon };
    };
  };

  navigation: {
    navigate: <T = {}>(name: string, options?: T) => void;
    emit: (event: NavigationEvent) => { defaultPrevented: boolean };
  };
}

export default function BottomNav(props: BottomNavProps) {
  const tabs = props.state.routes.map((route, index) => {
    const { tabBarIcon } = props.descriptors[route.key].options;
    const isFocused = props.state.index === index;

    function pressHandler() {
      const event = props.navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        props.navigation.navigate(route.name);
      }
    }

    function longPressHandler() {
      props.navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    }

    return (
      <Button
        active={isFocused}
        onPress={pressHandler}
        onLongPress={longPressHandler}
        key={route.key}
      >
        {tabBarIcon({ focused: isFocused })}
      </Button>
    );
  });

  return (
    <Footer>
      <FooterTab>{tabs}</FooterTab>
    </Footer>
  );
}
