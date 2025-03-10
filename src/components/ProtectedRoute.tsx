import React from "react";
import { useAuth, AuthProvider } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Inner component that uses the auth context
const ProtectedRouteContent: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = <DefaultFallback />,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  // If authenticated, render the children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, redirect to login or show fallback
  return <>{fallback}</>;
};

// Default fallback component redirects to login
const DefaultFallback: React.FC = () => {
  // We're using useEffect for client-side only redirect
  React.useEffect(() => {
    window.location.href = "/login";
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <div className="loading loading-spinner text-primary mb-4"></div>
      <p className="text-base-content/70">Redirecting to login...</p>
    </div>
  );
};

// Wrapper component that provides the auth context
const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  return (
    <AuthProvider>
      <ProtectedRouteContent {...props} />
    </AuthProvider>
  );
};

export default ProtectedRoute;
