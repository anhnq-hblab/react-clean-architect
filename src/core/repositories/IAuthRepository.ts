import { AuthTokens, User } from '../entities';

/**
 * Repository interface for authentication operations.
 * This is the contract that data layer must implement.
 */
export interface IAuthRepository {
  login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthTokens>;
  getCurrentUser(): Promise<User | null>;
  register(email: string, password: string, name: string): Promise<User>;
}
