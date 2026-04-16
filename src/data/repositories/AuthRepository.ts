import { AuthTokens, User } from '../../core/entities';
import { IAuthRepository } from '../../core/repositories';
import { authRemoteDataSource } from '../datasources/remote/AuthRemoteDataSource';
import { authGraphQLDataSource } from '../datasources/remote/graphql';
import { UserMapper } from '../mappers/UserMapper';
import { clearTokens, setTokens } from '../../shared/utils/tokenStorage';

// Switch between REST and GraphQL based on environment
const USE_GRAPHQL = import.meta.env.VITE_USE_GRAPHQL === 'true';

/**
 * AuthRepository implementation.
 * Supports both REST and GraphQL data sources.
 * Switch via VITE_USE_GRAPHQL env variable.
 */
export class AuthRepository implements IAuthRepository {
  async login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    let response;
    
    if (USE_GRAPHQL) {
      // GraphQL DataSource
      response = await authGraphQLDataSource.login(email, password);
    } else {
      // REST DataSource
      response = await authRemoteDataSource.login({ email, password });
    }
    
    const { user, tokens } = UserMapper.loginResponseToDomain(response);
    setTokens(tokens.accessToken, tokens.refreshToken);
    return { user, tokens };
  }

  async logout(): Promise<void> {
    if (USE_GRAPHQL) {
      await authGraphQLDataSource.logout();
    } else {
      await authRemoteDataSource.logout();
    }
    clearTokens();
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = USE_GRAPHQL
      ? await authGraphQLDataSource.refreshToken(refreshToken)
      : await authRemoteDataSource.refreshToken(refreshToken);
    
    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };
  }

  async getCurrentUser(): Promise<User | null> {
    const response = USE_GRAPHQL
      ? await authGraphQLDataSource.getCurrentUser()
      : await authRemoteDataSource.getCurrentUser();
    
    if (!response) return null;
    return UserMapper.toDomain(response);
  }

  async register(email: string, password: string, name: string): Promise<User> {
    const response = USE_GRAPHQL
      ? await authGraphQLDataSource.register(email, password, name)
      : await authRemoteDataSource.register({ email, password, name });
    
    return UserMapper.toDomain(response);
  }
}

// Singleton instance
export const authRepository = new AuthRepository();

