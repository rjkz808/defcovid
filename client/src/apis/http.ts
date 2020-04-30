import { from } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

/**
 * Represents allowed HTTP methods on endpoint instance
 */
export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
}

/**
 * Represents common structure of internal endpoint request
 */
export type EndpointRequest = [string, RequestInit];

/**
 * Type of endpoint middleware which accepts the previous value of request and returns the
 * modified version
 */
export type EndpointMiddleware = (...input: EndpointRequest) => EndpointRequest;

/**
 * Common HTTP error class which contains status code and error message
 */
export class HttpError extends Error {
  constructor(readonly status: number, message: string) {
    super(`Request failed with code: ${status} ${message}`);
    this.name = 'HttpError';
  }
}

/**
 * Endpoint middleware wich adds a parameter value to request URL
 * @param value Value to add as a parameter
 */
export function withParam<T>(value: T) {
  return (url: string, init: RequestInit): EndpointRequest => [`${url}/${value}`, init];
}

/**
 * Endpoint middleware wich adds JSON body to request
 * @param data Data to put in request body
 */
export function withJSONBody<T extends {}>(data: T) {
  return (url: string, init: RequestInit): EndpointRequest => [
    url,
    {
      ...init,
      body: JSON.stringify(data),
      headers: {
        ...init?.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  ];
}

/**
 * Makes query function which can be used to request data from routes relative to endpoint base
 * URL. Query function accepts 2 required arguments: HTTP method name and relative route path.
 * It can also accept a list of middlewares which are used to add additional configuration to
 * the request (JSON body, request params, etc.).
 * @param baseUrl Base URL to construct endpoint from
 * @param extractError Callback which extracts error from response of the failed request
 */
export default function makeEndpoint<E = {}>(baseUrl: string, extractError?: (res: E) => string) {
  return <R extends E>(method: HttpMethod, path: string, ...middlewares: EndpointMiddleware[]) => {
    const initialRequest: EndpointRequest = [baseUrl + path, { method }];

    const [url, init] = middlewares.reduce(
      (request, middleware) => middleware(...request),
      initialRequest
    );

    let response: Response;

    return from(fetch(url, init)).pipe(
      flatMap((res) => {
        response = res;
        return from(res.json() as Promise<R>);
      }),
      tap((json) => {
        if (!response.ok || response.status >= 400) {
          const getError = extractError ?? (() => response.statusText);
          throw new HttpError(response.status, getError(json));
        }
      })
    );
  };
}
