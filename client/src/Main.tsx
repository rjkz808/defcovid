import React, { useContext, useEffect } from 'react';
import { tap, filter, flatMap, catchError } from 'rxjs/operators';
import { Container } from 'native-base';
import { getUserById } from './apis/backend';
import { HttpError } from './apis/http';
import { getUserId, deleteUserId } from './apis/storage';
import AppLoading from './components/AppLoading';
import UserContext from './contexts/UserContext';
import AuthNavigator from './routes/AuthNavigator';
import RootNavigator from './routes/RootNavigator';
import { isNonNull } from './utils';

export default function Main() {
  const { dispatch, state } = useContext(UserContext);

  useEffect(() => {
    dispatch({ type: 'startAuth' });

    const authObservable = getUserId().pipe(
      tap((userId) => userId === null && dispatch({ type: 'authFailure' })),
      filter(isNonNull),
      flatMap((userId) => getUserById(userId)),
      catchError((err) => {
        if (err instanceof HttpError && err.status === 404) {
          return deleteUserId();
        } else {
          throw err;
        }
      })
    );

    authObservable.subscribe({
      next(res) {
        if (res !== undefined) {
          dispatch({ type: 'authSuccess', payload: res });
        } else {
          dispatch({ type: 'authFailure' });
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }, []);

  if (state.loading) {
    return <AppLoading />;
  }

  if (!state.authenticated) {
    return (
      <Container>
        <AuthNavigator />
      </Container>
    );
  }

  return (
    <Container>
      <RootNavigator />
    </Container>
  );
}
