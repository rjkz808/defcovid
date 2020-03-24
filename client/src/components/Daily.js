import React, { useContext } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import Container from 'react-bootstrap/Container';
import styled, { ThemeContext } from 'styled-components';

const DailyContainer = styled(Container)`
  height: 80vh;
`;

const DailyContent = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const DailyLabel = styled.div`
  color: ${props => props.theme.colors.success};
  font-size: 90px;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  line-height: 1;
  font-weight: 500;
  margin: 0;
  margin: 1rem;
  text-shadow: 0px 0px 7px ${props => props.theme.colors.success};
`;

export default function Daily() {
  const themeContext = useContext(ThemeContext);

  return (
    <DailyContainer className="vh-80">
      <DailyContent>
        <DailyLabel>WIP</DailyLabel>
        <BarLoader color={themeContext.colors.success} height="6" width="200" />
      </DailyContent>
    </DailyContainer>
  );
}
