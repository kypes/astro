import React from "react";
import { LogIn } from "lucide-react";
import { useAuth, AuthProvider } from "../hooks/useAuth";

// Discord SVG logo
const DiscordLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 127.14 96.36"
    className="h-5 w-5"
  >
    <path
      d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z"
      fill="currentColor"
    />
  </svg>
);

// LoginForm component content that uses the auth context
const LoginFormContent: React.FC = () => {
  const { isAuthenticated, isLoading, user, error, login, logout } = useAuth();

  // Login with Discord
  const handleDiscordLogin = () => {
    login("discord");
  };

  // If loading, show loading indicator
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="mt-4 text-base-content/70">
          Loading authentication status...
        </p>
      </div>
    );
  }

  // If authenticated, show user info and logout button
  if (isAuthenticated && user) {
    return (
      <div className="flex flex-col items-center p-6 text-center">
        <div className="avatar mb-4">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {user.image ? (
              <img src={user.image} alt={user.name || "User"} />
            ) : (
              <div className="bg-primary/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {user.name?.charAt(0) || "U"}
                </span>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-1">
          {user.name || "Discord User"}
        </h2>
        {user.email && (
          <p className="text-base-content/70 mb-4">{user.email}</p>
        )}

        <div className="bg-base-100 p-6 rounded-xl w-full mb-6">
          <h3 className="text-lg font-semibold mb-2">Account Information</h3>
          <p className="text-sm mb-1">
            <span className="opacity-70">User ID:</span> {user.id}
          </p>
          <p className="text-sm">
            <span className="opacity-70">Auth Provider:</span> Discord
          </p>
        </div>

        <button
          onClick={logout}
          className="btn btn-outline btn-error gap-2 mt-4"
        >
          <LogIn className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    );
  }

  // If not authenticated, show Discord login button
  return (
    <div>
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold">Sign In</h2>
        <p className="mt-2 text-base-content/70">
          Use your Discord account to access Kingdom Leaks
        </p>
      </div>

      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
        </div>
      )}

      {/* Discord login button */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="bg-base-100 p-6 rounded-xl text-center w-full mb-4">
          <p className="mb-4">
            Click the button below to sign in with your Discord account
          </p>

          <button
            onClick={handleDiscordLogin}
            className="btn btn-primary btn-lg gap-2 w-full"
          >
            <DiscordLogo />
            Sign in with Discord
          </button>
        </div>

        <div className="text-center text-sm text-base-content/70">
          <p>Don't have a Discord account?</p>
          <a
            href="https://discord.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            Create one here
          </a>
        </div>
      </div>
    </div>
  );
};

// Wrapper component that provides the auth context
const LoginForm: React.FC = () => {
  return (
    <AuthProvider>
      <LoginFormContent />
    </AuthProvider>
  );
};

export default LoginForm;
