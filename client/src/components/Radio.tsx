import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import * as NativeBase from 'native-base';
import { colors } from '../theme';

export interface RadioProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Radio(props: RadioProps) {
  return (
    <NativeBase.ListItem noBorder style={[styles.radioContainer, props.style]}>
      <NativeBase.Left>
        <NativeBase.Radio
          onPress={props.onSelect}
          selected={props.selected}
          style={styles.radio}
          disabled={props.disabled ?? false}
          color={props.selected ? colors.primary : colors.secondary}
        />
        <NativeBase.Text>{props.children}</NativeBase.Text>
      </NativeBase.Left>
    </NativeBase.ListItem>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    marginLeft: 0,
    paddingBottom: 0,
  },
  radio: {
    marginRight: 10,
  },
});
