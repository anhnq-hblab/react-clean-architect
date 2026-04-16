import { graphqlClient } from './graphqlClient';
import { GET_CURRENT_USER } from './queries/auth.queries';
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  REGISTER_MUTATION,
  REFRESH_TOKEN_MUTATION,
} from './mutations/auth.mutations';

// Response types
interface LoginResponse {
  login: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

interface UserResponse {
  me: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

interface RegisterResponse {
  register: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
  };
}

interface RefreshTokenResponse {
  refreshToken: {
    accessToken: string;
    refreshToken: string;
  };
}

/**
 * GraphQL DataSource for authentication.
 * Uses Apollo Client for GraphQL operations.
 */
export class AuthGraphQLDataSource {
  async login(email: string, password: string) {
    const { data } = await graphqlClient.mutate<LoginResponse>({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });
    
    if (!data?.login) {
      throw new Error('Login failed');
    }
    
    // Convert to match REST API format (snake_case)
    return {
      user: {
        id: data.login.user.id,
        email: data.login.user.email,
        name: data.login.user.name,
        role: data.login.user.role,
        created_at: data.login.user.createdAt,
        updated_at: data.login.user.updatedAt,
      },
      tokens: {
        access_token: data.login.tokens.accessToken,
        refresh_token: data.login.tokens.refreshToken,
      },
    };
  }

  async logout(): Promise<void> {
    await graphqlClient.mutate({
      mutation: LOGOUT_MUTATION,
    });
    // Clear Apollo cache on logout
    await graphqlClient.clearStore();
  }

  async getCurrentUser() {
    try {
      const { data } = await graphqlClient.query<UserResponse>({
        query: GET_CURRENT_USER,
        fetchPolicy: 'network-only',
      });
      
      if (!data?.me) return null;
      
      return {
        id: data.me.id,
        email: data.me.email,
        name: data.me.name,
        role: data.me.role,
        created_at: data.me.createdAt,
        updated_at: data.me.updatedAt,
      };
    } catch {
      return null;
    }
  }

  async register(email: string, password: string, name: string) {
    const { data } = await graphqlClient.mutate<RegisterResponse>({
      mutation: REGISTER_MUTATION,
      variables: { email, password, name },
    });
    
    if (!data?.register) {
      throw new Error('Registration failed');
    }
    
    return {
      id: data.register.id,
      email: data.register.email,
      name: data.register.name,
      role: data.register.role,
      created_at: data.register.createdAt,
      updated_at: data.register.createdAt,
    };
  }

  async refreshToken(refreshToken: string) {
    const { data } = await graphqlClient.mutate<RefreshTokenResponse>({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { refreshToken },
    });
    
    if (!data?.refreshToken) {
      throw new Error('Failed to refresh token');
    }
    
    return {
      access_token: data.refreshToken.accessToken,
      refresh_token: data.refreshToken.refreshToken,
    };
  }
}

export const authGraphQLDataSource = new AuthGraphQLDataSource();
