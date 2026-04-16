import { STORAGE_KEYS } from '../../../shared/constants';

/**
 * Local DataSource for cached/offline data.
 */
export class LocalDataSource {
  // User
  getUser<T>(): T | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  }

  setUser<T>(user: T): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  clearUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  // Generic storage
  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export const localDataSource = new LocalDataSource();
