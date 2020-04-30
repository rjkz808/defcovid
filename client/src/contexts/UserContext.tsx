import React, { useReducer } from 'react';
import { User } from '../apis/backend';

interface UserState {
  authenticated: boolean;
  loading: boolean;
  user?: User;
}

interface StartAuthAction {
  type: 'startAuth';
}

interface AuthSuccessAction {
  type: 'authSuccess';
  payload: User;
}

interface AuthFailureAction {
  type: 'authFailure';
}

interface AddPoints {
  type: 'addPoints';
  payload: number;
}

interface SubPoints {
  type: 'subPoints';
  payload: number;
}

type UserAction = StartAuthAction | AuthSuccessAction | AuthFailureAction | AddPoints | SubPoints;

const initialState = {
  authenticated: false,
  loading: false,
};

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'startAuth':
      return { ...state, authenticated: false, loading: true };
    case 'authSuccess':
      return { authenticated: true, loading: false, user: action.payload };
    case 'authFailure':
      return { ...state, authenticated: false, loading: false };

    case 'addPoints': {
      if (state.user === undefined) {
        return state;
      }
      return {
        ...state,
        user: {
          ...state.user,
          points: state.user.points + action.payload,
        },
      };
    }

    case 'subPoints': {
      if (state.user === undefined) {
        return state;
      }
      return {
        ...state,
        user: {
          ...state.user,
          points: state.user.points - action.payload,
        },
      };
    }

    default:
      return state;
  }
}

interface UserContextState {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}

const UserContext = React.createContext<UserContextState>({
  state: initialState,
  dispatch: () => null,
});

export interface UserContextProviderProps {
  children: React.ReactNode;
}

export function UserContextProvider(props: UserContextProviderProps) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return <UserContext.Provider value={{ dispatch, state }}>{props.children}</UserContext.Provider>;
}

export default UserContext;
