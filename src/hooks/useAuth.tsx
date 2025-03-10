import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Session } from "@auth/core/types";

// Extended Session type to include error
interface ExtendedSession extends Session {
  error?: string;
}

// Auth context state interface
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Session["user"] | null;
  error: string | null;
  login: (provider?: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  login: async () => {},
  logout: async () => {},
});

// Hook for child components to get the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app and makes auth object available to any child component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Session["user"] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the current session
  const fetchSession = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch session from Auth Astro API
      const res = await fetch("/api/auth/session", {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });

      if (!res.ok) {
        throw new Error(`Auth API error: ${res.status}`);
      }

      const session = (await res.json()) as ExtendedSession | null;

      if (session?.error) {
        throw new Error(session.error);
      }

      setIsAuthenticated(!!session?.user);
      setUser(session?.user || null);
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(
        `Authentication error: ${err?.message || "Service unavailable"}`
      );
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    fetchSession();
    // Set up session polling every 5 minutes
    const interval = setInterval(fetchSession, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Login function - redirects to provider OAuth flow
  const login = async (provider = "discord") => {
    try {
      setError(null);
      const { signIn } = await import("auth-astro/client");
      await signIn(provider);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(`Login failed: ${err?.message || "Unknown error"}`);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setError(null);
      const { signOut } = await import("auth-astro/client");
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (err: any) {
      setError(`Logout failed: ${err?.message || "Unknown error"}`);
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
