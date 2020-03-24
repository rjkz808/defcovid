import React, { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants';

const PointsContext = createContext();

function PointsContextProvider(props) {
  const [points, setPoints] = useState(0);

  const addPoints = useCallback(amount => {
    setPoints(points => {
      const value = points + amount;
      return value > constants.MAX_POINTS ? constants.MAX_POINTS : value;
    });
  }, []);

  const subtractPoints = useCallback(amount => {
    setPoints(points => {
      const value = points - amount;
      return value < constants.MIN_POINTS ? constants.MIN_POINTS : value;
    });
  }, []);

  const value = useMemo(() => {
    return { points, addPoints, subtractPoints };
  }, [points, addPoints, subtractPoints]);

  return <PointsContext.Provider value={value}>{props.children}</PointsContext.Provider>;
}

PointsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PointsContextProvider };
export default PointsContext;
