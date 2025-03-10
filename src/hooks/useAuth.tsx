import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Session } from "@auth/core/types";

// Auth context state interface
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Session["user"] | null;
  error: string | null;
  login: (provider?: string) => void;
  logout: () => void;
}

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  login: () => {},
  logout: () => {},
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

      // Check if running in development environment
      const isDev =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      // In production or development, attempt to call the Auth Astro API
      console.log("Fetching session from Auth Astro...");
      const res = await fetch("/api/auth/session");

      // Check if response is OK
      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`);
      }

      const session = (await res.json()) as Session | null;
      console.log("Session data:", session);

      setIsAuthenticated(!!session);
      setUser(session?.user || null);
    } catch (err: any) {
      console.error("Auth error:", err);
      // Show more helpful error message in production
      setError(
        `Authentication service unavailable. Please try again later. ${
          err?.message ? `(${err.message})` : ""
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    fetchSession();
  }, []);

  // Login function - redirects to Discord OAuth flow
  const login = async (provider = "discord") => {
    try {
      const { signIn } = await import("auth-astro/client");
      await signIn(provider);
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to initiate login");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { signOut } = await import("auth-astro/client");
      await signOut();
    } catch (err) {
      setError("Failed to log out");
      console.error(err);
    }
  };

  // Context provider
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
