import React, { useCallback, useContext, useMemo, useState } from 'react';
import { PieChart, Pie, Label, Cell, ResponsiveContainer } from 'recharts';
import styled, { ThemeContext } from 'styled-components';
import * as constants from '../constants';
import PointsContext from '../contexts/PointsContext';

const PointChartContainer = styled.div`
  margin-right: auto;
  margin-left: auto;

  /* Extra small devices (portrait phones, less than 576px) */
  @media (max-width: 575.98px) {
    width: 65vw;
    height: 65vw;
  }

  /* Small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) and (max-width: 767.98px) {
    width: 50vw;
    height: 50vw;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 40vw;
    height: 40vw;
  }

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) and (max-width: 1199.98px) {
    width: 35vw;
    height: 35vw;
  }

  /* Extra large devices (large desktops, 1200px and up) */
  @media (min-width: 1200px) {
    width: 20vw;
    height: 20vw;
  }
`;

export default function PointChart() {
  const [animation, setAnimation] = useState(true);
  const pointsContext = useContext(PointsContext);
  const themeContext = useContext(ThemeContext);

  const isPositive = pointsContext.points > constants.NO_POINTS;
  const pointsAbsolute = Math.abs(pointsContext.points);

  const data = useMemo(
    () => [
      {
        name: 'fill',
        value: pointsAbsolute,
        color: isPositive ? themeContext.colors.success : themeContext.colors.danger,
      },
      {
        name: 'empty',
        value: constants.MAX_POINTS - pointsAbsolute,
        color: themeContext.colors.transparent,
      },
    ],
    [isPositive, pointsAbsolute, themeContext.colors]
  );

  const cells = useMemo(() => {
    return data.map(entry => (
      <Cell
        stroke={themeContext.colors.foreground}
        strokeWidth="0.1em"
        key={entry.name}
        fill={entry.color}
      />
    ));
  }, [data, themeContext.colors]);

  function getSign() {
    if (pointsContext.points > 0) {
      return '+';
    }

    if (pointsContext.points === 0) {
      return '';
    }

    return '-';
  }

  const handleAnimationEnd = useCallback(() => {
    setAnimation(false);
  }, []);

  return (
    <PointChartContainer>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius="70%"
            outerRadius="100%"
            stroke="none"
            dataKey="value"
            startAngle={isPositive ? 450 : 90}
            endAngle={isPositive ? 90 : 450}
            animationBegin={animation ? 300 : 0}
            animationDuration={animation ? 1000 : 0}
            onAnimationEnd={handleAnimationEnd}
          >
            {cells}
            <Label
              fontFamily="Roboto"
              fontSize="3em"
              fontWeight={300}
              position="center"
              fill={themeContext.colors.foreground}
            >
              {getSign() + pointsAbsolute.toString()}
            </Label>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </PointChartContainer>
  );
}
