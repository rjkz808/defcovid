import React from 'react';
import { StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import * as constants from '../constants';
import { colors } from '../theme';

export interface PointChartProps {
  points: number;
}

export default function PointChart(props: PointChartProps) {
  const isPositive = props.points > constants.NO_POINTS;
  const pointsAbsolute = Math.abs(props.points);
  const progress = pointsAbsolute >= constants.MAX_POINTS ? 1 : pointsAbsolute / 100;

  return (
    <ProgressCircle
      style={styles.progress}
      progress={progress}
      progressColor={isPositive ? colors.success : colors.danger}
      backgroundColor={colors.neutral}
      strokeWidth={12}
      startAngle={isPositive ? 0 : Math.PI * 2}
      endAngle={isPositive ? Math.PI * 2 : 0}
    />
  );
}

const styles = StyleSheet.create({
  progress: {
    height: 200,
    marginTop: 30,
    marginBottom: 20,
  },
});
