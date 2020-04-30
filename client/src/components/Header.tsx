import React from 'react';
import { Body, Left, Header as NativeHeader, Right, Title, Button, Icon } from 'native-base';

export interface HeaderProps {
  hasBack?: boolean;
  onBack?: () => void;
  title: string;
}

export default function Header(props: HeaderProps) {
  const back = props.hasBack ?? false;

  return (
    <NativeHeader noLeft={!back}>
      <Left>
        {back ? (
          <Button onPress={props.onBack} transparent>
            <Icon name="arrow-back" />
          </Button>
        ) : (
          <React.Fragment />
        )}
      </Left>
      <Body>
        <Title>{props.title}</Title>
      </Body>
      <Right />
    </NativeHeader>
  );
}
