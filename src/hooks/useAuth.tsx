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

      const res = await fetch("/api/auth/session");
      const data = (await res.json()) as SessionResponse;

      setIsAuthenticated(data.authenticated);
      setUser(data.session?.user || null);
    } catch (err) {
      setError("Failed to fetch authentication state");
      console.error(err);
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
    // Redirect to the OpenAuth.js signin URL with the specified provider
    window.location.href = `/api/auth/signin/${provider}`;
  };

  // Logout function
  const logout = async () => {
    try {
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
