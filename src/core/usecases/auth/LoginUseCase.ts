import { IAuthRepository } from '../../repositories';
import { AuthTokens, User } from '../../entities';

/**
 * Login UseCase - Contains business logic for user authentication.
 * This is independent of any framework or external dependencies.
 */
export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<{ user: User; tokens: AuthTokens }> {
    // Business validation
    if (!email || !email.trim()) {
      throw new Error('Email is required');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Delegate to repository
    return this.authRepository.login(email.trim().toLowerCase(), password);
  }
}
