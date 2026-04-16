import { ApolloClient, InMemoryCache, createHttpLink, from, ApolloLink, FetchResult } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Observable } from '@apollo/client/utilities';
import { getAccessToken, clearTokens } from '../../../../shared/utils/tokenStorage';

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql';

// HTTP Link
const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

// Auth Link - Add authorization header
const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Error Handler Link
const errorHandlerLink = new ApolloLink((operation, forward) => {
  return new Observable<FetchResult>((observer) => {
    const subscription = forward(operation).subscribe({
      next: (response) => {
        // Check for errors in response
        if (response.errors) {
          response.errors.forEach((error) => {
            console.error(`[GraphQL error]: ${error.message}`);
            
            // Handle unauthorized
            if (error.extensions?.code === 'UNAUTHENTICATED') {
              clearTokens();
              window.location.href = '/login';
            }
          });
        }
        observer.next(response);
      },
      error: (networkError) => {
        console.error(`[Network error]: ${networkError.message}`);
        observer.error(networkError);
      },
      complete: () => observer.complete(),
    });

    return () => subscription.unsubscribe();
  });
});

// Logging Link (development only)
const loggingLink = new ApolloLink((operation, forward) => {
  if (import.meta.env.DEV) {
    console.log(`[GraphQL]: ${operation.operationName}`);
  }
  return forward(operation);
});

// Create Apollo Client
export const graphqlClient = new ApolloClient({
  link: from([loggingLink, errorHandlerLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

export default graphqlClient;
