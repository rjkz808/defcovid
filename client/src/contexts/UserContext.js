import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants';

const UserContext = createContext();

function UserContextProvider(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem('auth');

    if (userId !== null) {
      const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`;

      const fetchPromise = fetch(endpoint);
      const bodyPromise = fetchPromise.then(res => {
        if (!res.ok || res.status !== 200) {
          return Promise.reject(new Error(`User query failed with code: ${res.status}`));
        } else {
          return res.json();
        }
      }, console.error);

      bodyPromise.then(body => {
        localStorage.setItem('auth', body._id);
        setUser(body);
        setAuthenticated(true);
        setLoading(false);
      }, console.error);
    } else {
      setAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const authenticate = useCallback(data => {
    setLoading(true);
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/users`;

    const fetchPromise = fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const bodyPromise = fetchPromise.then(res => {
      if (!res.ok || res.status !== 200) {
        return Promise.reject(new Error(`Failed to authenticate: code ${res.status}`));
      } else {
        return res.json();
      }
    }, console.error);

    bodyPromise.then(body => {
      localStorage.setItem('auth', body._id);
      setUser(body);
      setAuthenticated(true);
      setLoading(false);
    }, console.error);
  }, []);

  const changePoints = useCallback(async points => {
    const userId = localStorage.getItem('auth');
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/users/points/${userId}`;

    const response = await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify({ points }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setUser(data);
  }, []);

  const addPoints = useCallback(
    async amount => {
      const points = user.points + amount;
      await changePoints(points > constants.MAX_POINTS ? constants.MAX_POINTS : points);
    },
    [changePoints, user.points]
  );

  const subtractPoints = useCallback(
    async amount => {
      const points = user.points - amount;
      await changePoints(points < constants.MIN_POINTS ? constants.MIN_POINTS : points);
    },
    [changePoints, user.points]
  );

  const value = useMemo(() => {
    return { addPoints, authenticate, authenticated, loading, subtractPoints, user };
  }, [addPoints, authenticate, authenticated, loading, subtractPoints, user]);

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContextProvider };
export default UserContext;
