import { post, get } from './api';
import { Endpoints } from './api/endpoints';

// DTOs - Data Transfer Objects
export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface RegisterRequestDTO {
  email: string;
  password: string;
  name: string;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

/**
 * Remote Data Source for authentication.
 * Handles all API calls related to auth.
 */
export class AuthRemoteDataSource {
  async login(request: LoginRequestDTO): Promise<LoginResponseDTO> {
    return post<LoginResponseDTO, LoginRequestDTO>(Endpoints.AUTH.LOGIN, request);
  }

  async logout(): Promise<void> {
    return post(Endpoints.AUTH.LOGOUT);
  }

  async register(request: RegisterRequestDTO): Promise<UserResponseDTO> {
    return post<UserResponseDTO, RegisterRequestDTO>(Endpoints.AUTH.REGISTER, request);
  }

  async getCurrentUser(): Promise<UserResponseDTO | null> {
    try {
      return await get<UserResponseDTO>(Endpoints.AUTH.ME);
    } catch {
      return null;
    }
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string; refresh_token: string }> {
    return post(Endpoints.AUTH.REFRESH, { refresh_token: refreshToken });
  }
}

export const authRemoteDataSource = new AuthRemoteDataSource();
