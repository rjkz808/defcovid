import makeEndpoint, { HttpMethod, withJSONBody, withParam } from './http';
import Constants from 'expo-constants';

/**
 * Common response structure of failed requests
 */
interface ErrorResponse {
  error?: string;
}

/**
 * User model which is being stored in DB
 */
export interface User {
  _id: string;
  name: string;
  gender: string;
  points: number;
  dangerousAge: boolean;
  chronicDiseases: boolean;
  contact: boolean;
}

const HOST = Constants.manifest.debuggerHost?.split(':')[0];
const API_ENDPOINT = `http://${HOST}:8080`;

const query = makeEndpoint<ErrorResponse>(
  API_ENDPOINT,
  (res) => res.error ?? 'Something went wrong'
);

/**
 * Get user data by its ID from REST API
 * @param id ID of a user to query the data of
 */
export function getUserById(id: string) {
  return query<User & ErrorResponse>(HttpMethod.Get, '/users', withParam(id));
}

/**
 * Authenticates user in REST API
 * @param data Authentication data (which is basically User without `_id` and `points` fields)
 */
export function authenticate(data: Omit<User, '_id' | 'points'>) {
  return query<User & ErrorResponse>(HttpMethod.Post, '/users', withJSONBody(data));
}

/**
 * Updates points of provided user in backend
 * @param userId ID of a user go update points value of
 * @param points Updated value
 */
export function updatePoints(userId: string, points: number) {
  return query<User & ErrorResponse>(
    HttpMethod.Put,
    `/users/points`,
    withParam(userId),
    withJSONBody({ points })
  );
}
