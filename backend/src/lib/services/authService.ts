import { apiRequest, authStorage } from './apiClient.ts';
import type { User, Profile } from '../types.ts';

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  fullName: string;
}

export interface LoginPayload {
  identifier: string; // email or username
  password: string;
}

export const authService = {
  async register(payload: RegisterPayload): Promise<{ user: User; token: string }> {
    const res = await apiRequest<{ user: User; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (res.token) {
      authStorage.setToken(res.token);
    }
    return res;
  },

  async login(payload: LoginPayload): Promise<{ user: User; token: string }> {
    const res = await apiRequest<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (res.token) {
      authStorage.setToken(res.token);
    }
    return res;
  },

  async logout(): Promise<void> {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' });
    } catch {
      // Continue client cleanup even if network fails
    } finally {
      authStorage.removeToken();
    }
  },

  async getCurrentUser(): Promise<User | null> {
    const token = authStorage.getToken();
    if (!token) return null;
    try {
      const res = await apiRequest<{ user: User }>('/api/auth/me');
      return res.user;
    } catch {
      authStorage.removeToken();
      return null;
    }
  },

  async getProfile(): Promise<Profile | null> {
    try {
      const res = await apiRequest<{ profile: Profile }>('/api/profile');
      return res.profile;
    } catch {
      return null;
    }
  },

  async updateProfile(data: Partial<Profile>): Promise<Profile> {
    const res = await apiRequest<{ profile: Profile }>('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.profile;
  },

  async forgotPassword(email: string): Promise<{ message: string; sent: boolean }> {
    return apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  isAuthenticated(): boolean {
    return Boolean(authStorage.getToken());
  },
};
