import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Define the session type based on the OpenAuth.js structure
interface Session {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
  provider: string;
  expires: string;
}

// Define the response type for session API
interface SessionResponse {
  authenticated: boolean;
  session: Session | null;
  expires: string | null;
  error?: string;
}

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

      // Check if running in development environment
      const isDev =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      if (isDev) {
        // In development, simulate a successful response for testing UI
        console.log(
          "Running in development mode - simulating authentication API"
        );

        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Set unauthenticated state
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      // In production, attempt to call the real API
      const res = await fetch("/api/auth/session");

      // Check if response is OK
      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API response is not JSON");
      }

      const data = (await res.json()) as SessionResponse;

      setIsAuthenticated(data.authenticated);
      setUser(data.session?.user || null);
    } catch (err) {
      console.error("Auth error:", err);
      setError(
        "API not available yet. This is normal during local development."
      );
      // Don't show the full error to users, just log it
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    fetchSession();
  }, []);

  // Login function - redirects to Discord OAuth flow
  const login = (provider = "discord") => {
    // Check if we're in development
    const isDev =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isDev) {
      // In development, show a message about Discord auth not working locally
      alert(
        "Discord authentication requires a deployed Cloudflare environment. In production, you would be redirected to Discord for authentication."
      );
      return;
    }

    // In production, redirect to the auth endpoint
    window.location.href = `/api/auth/signin/${provider}`;
  };

  // Logout function
  const logout = async () => {
    try {
      // Check if we're in development
      const isDev =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      if (isDev) {
        // In development, just show a message
        alert(
          "Logout functionality requires a deployed Cloudflare environment."
        );
        return;
      }

      // In production, redirect to the logout endpoint
      window.location.href = "/api/auth/signout";
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
