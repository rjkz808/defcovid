import React from 'react';
import { PieChart, Pie, Label, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const COLOR_NEUTRAL = '#ffffff00';
const COLOR_POSITIVE = '#30ff86';
const COLOR_NEGATIVE = '#ff3e30';
const FOREGROUND_COLOR = '#fafafa';

const NO_POINTS = 0;
const MAX_POINTS = 100;

const ChartContainer = styled.div`
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

function Chart(props) {
  const isPositive = props.points > NO_POINTS;
  const pointsAbsolute = Math.abs(props.points);

  const data = [
    {
      name: 'fill',
      value: pointsAbsolute,
      color: isPositive ? COLOR_POSITIVE : COLOR_NEGATIVE,
    },
    {
      name: 'empty',
      value: MAX_POINTS - pointsAbsolute,
      color: COLOR_NEUTRAL,
    },
  ];

  const cells = data.map(entry => (
    <Cell stroke={FOREGROUND_COLOR} strokeWidth="0.1em" key={entry.name} fill={entry.color} />
  ));

  function getSign() {
    if (props.points > 0) return '+';
    if (props.points === 0) return '';
    return '-';
  }

  return (
    <ChartContainer>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} innerRadius="70%" outerRadius="100%" stroke="none" dataKey="value">
            {cells}
            <Label
              fontFamily="Roboto"
              position="center"
              fill={FOREGROUND_COLOR}
              style={{ fontSize: 'calc(2em + 1vw)' }}
            >
              {getSign() + pointsAbsolute.toString()}
            </Label>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

Chart.propTypes = {
  points: PropTypes.number.isRequired,
};

export default Chart;
