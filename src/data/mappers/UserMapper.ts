import { User, UserRole } from '../../core/entities';
import { LoginResponseDTO, UserResponseDTO } from '../datasources/remote/AuthRemoteDataSource';

/**
 * Mapper to convert between DTOs and Domain Entities.
 * Keeps data layer concerns separate from domain.
 */
export class UserMapper {
  /**
   * Map UserResponseDTO to User entity
   */
  static toDomain(dto: UserResponseDTO): User {
    return {
      id: dto.id,
      email: dto.email,
      name: dto.name,
      role: dto.role as UserRole,
      createdAt: new Date(dto.created_at),
      updatedAt: new Date(dto.updated_at),
    };
  }

  /**
   * Map LoginResponseDTO to domain objects
   */
  static loginResponseToDomain(dto: LoginResponseDTO): {
    user: User;
    tokens: { accessToken: string; refreshToken: string };
  } {
    return {
      user: this.toDomain(dto.user),
      tokens: {
        accessToken: dto.tokens.access_token,
        refreshToken: dto.tokens.refresh_token,
      },
    };
  }

  /**
   * Map User entity to DTO (for API requests)
   */
  static toDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    };
  }
}
