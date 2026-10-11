import { AuthSession, AuthUser } from '../types';
import { INITIAL_AUTH_SESSION } from '../mock/bodyProfile';

const AUTH_STORAGE_KEY = 'collection_it_all_auth_session_v2';

/**
 * authService handles user authentication, registration, session management,
 * and password recovery placeholders.
 */
export const authService = {
  /**
   * Retrieves the current authenticated session.
   * // TODO: connect backend (e.g., GET /api/auth/me with Bearer token)
   */
  getCurrentUser: async (): Promise<AuthSession> => {
    if (typeof window === 'undefined') {
      return INITIAL_AUTH_SESSION;
    }
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading auth session from storage:', e);
    }
    return INITIAL_AUTH_SESSION;
  },

  /**
   * Simulates user login with email/username and password.
   * // TODO: connect backend (e.g., POST /api/auth/login)
   */
  login: async (
    emailOrUsername: string,
    _password: string,
    rememberMe: boolean = true
  ): Promise<{ success: boolean; session?: AuthSession; error?: string }> => {
    // Note: Password is never stored in localStorage for security best practices.
    // Real security requires backend authentication with hashed credentials & JWT/HttpOnly cookies.
    await new Promise((res) => setTimeout(res, 350)); // simulate brief network latency

    if (!emailOrUsername.trim()) {
      return { success: false, error: 'Email or username is required.' };
    }

    const nameGuess = emailOrUsername.includes('@')
      ? emailOrUsername.split('@')[0].replace(/[._]/g, ' ')
      : emailOrUsername;
    const formattedName =
      nameGuess.charAt(0).toUpperCase() + nameGuess.slice(1);

    const session: AuthSession = {
      isAuthenticated: true,
      rememberMe,
      user: {
        id: `usr_${Date.now()}`,
        name: formattedName || 'Elena Rostova',
        email: emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@wardrobe.local`,
        username: emailOrUsername.includes('@') ? emailOrUsername.split('@')[0] : emailOrUsername,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      },
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    }

    return { success: true, session };
  },

  /**
   * Simulates user signup.
   * // TODO: connect backend (e.g., POST /api/auth/register)
   */
  signup: async (
    fullName: string,
    email: string,
    username: string,
    _password: string
  ): Promise<{ success: boolean; session?: AuthSession; error?: string }> => {
    await new Promise((res) => setTimeout(res, 400));

    if (!fullName.trim() || !email.trim()) {
      return { success: false, error: 'Full name and email are required.' };
    }

    const session: AuthSession = {
      isAuthenticated: true,
      rememberMe: true,
      user: {
        id: `usr_${Date.now()}`,
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        username: username.trim() || email.split('@')[0],
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      },
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    }

    return { success: true, session };
  },

  /**
   * Logs out the current user and clears session state.
   * // TODO: connect backend (e.g., POST /api/auth/logout)
   */
  logout: async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  },

  /**
   * Simulates password reset request.
   * // TODO: connect backend (e.g., POST /api/auth/forgot-password)
   */
  requestPasswordReset: async (email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((res) => setTimeout(res, 300));
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    return {
      success: true,
      message: `If an account matches ${email}, password reset instructions have been sent.`,
    };
  },
};
