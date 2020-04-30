import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import * as NativeBase from 'native-base';
import { colors } from '../theme';

export interface CheckboxProps {
  checked?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onCheck?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <NativeBase.ListItem noBorder style={[styles.checkbox, props.style]}>
      <NativeBase.CheckBox
        color={props.checked ? colors.primary : colors.secondary}
        checked={props.checked ?? false}
        onPress={props.onCheck}
        disabled={props.disabled ?? false}
      />
      <NativeBase.Body>
        <NativeBase.Text>{props.children}</NativeBase.Text>
      </NativeBase.Body>
    </NativeBase.ListItem>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    marginLeft: 0,
    paddingBottom: 0,
  },
});
