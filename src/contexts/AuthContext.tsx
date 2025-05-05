import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_AUTH_ENDPOINT,
  GOOGLE_TOKEN_ENDPOINT,
  GOOGLE_REDIRECT_URI,
  GOOGLE_SCOPE,
} from '../config/auth';

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const decoded = jwtDecode<{ email: string; name: string; sub: string; picture?: string }>(token);
          setUser({
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
          });
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        localStorage.removeItem('access_token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      // Generate a random state value for CSRF protection
      const state = Math.random().toString(36).substring(7);
      localStorage.setItem('oauth_state', state);

      // Construct the Google OAuth URL
      const authUrl = new URL(GOOGLE_AUTH_ENDPOINT);
      authUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID);
      authUrl.searchParams.append('redirect_uri', GOOGLE_REDIRECT_URI);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('scope', GOOGLE_SCOPE);
      authUrl.searchParams.append('state', state);
      authUrl.searchParams.append('access_type', 'offline');
      authUrl.searchParams.append('prompt', 'consent');

      // Redirect to Google OAuth
      window.location.href = authUrl.toString();
    } catch (err) {
      setError('Failed to initiate login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      // Clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      // Clear user state
      setUser(null);

      // Revoke Google token if available
      const token = localStorage.getItem('access_token');
      if (token) {
        await fetch('https://oauth2.googleapis.com/revoke', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `token=${token}`,
        });
      }

      // Navigate to home page
      navigate('/');
    } catch (err) {
      setError('Failed to logout');
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      let token = localStorage.getItem('access_token');
      if (!token) return null;

      // Check if token is expired
      const decoded = jwtDecode<{ exp: number }>(token);
      if (decoded.exp * 1000 < Date.now()) {
        // Token expired, try to refresh
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          await logout();
          return null;
        }

        const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          }),
        });

        if (!response.ok) {
          await logout();
          return null;
        }

        const data = await response.json();
        token = data.access_token;
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }
      }

      return token;
    } catch (err) {
      console.error('Error getting access token:', err);
      return null;
    }
  }, [logout]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    getAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider }; 