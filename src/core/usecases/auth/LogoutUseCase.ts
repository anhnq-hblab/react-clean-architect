import { IAuthRepository } from '../../repositories';

/**
 * Logout UseCase - Handles user logout business logic.
 */
export class LogoutUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.logout();
  }
}
