import React, { createContext, useState, useContext, useEffect } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    userData: Omit<User, "id"> & { password: string },
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  loginWithUserData?: (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Direct login with user data (for temporary owner access)
  const loginWithUserData = (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const nameParts = userData.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const mockUser: User = {
      id: `user-${Date.now()}`,
      firstName,
      lastName,
      email: userData.email,
      phone: "+20 123 456 7890",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`,
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check for owner credentials
      if (email === "owner@owner.com" && password === "owner1234") {
        const mockUser: User = {
          id: "owner-1",
          firstName: "Mohamad",
          lastName: "Kahil",
          email: "owner@owner.com",
          phone: "+20 123 456 7890",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamad",
        };

        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return;
      }

      // Mock validation for demo user
      if (email === "demo@example.com" && password === "password") {
        const mockUser: User = {
          id: "user-1",
          firstName: "Ahmed",
          lastName: "Hassan",
          email: "demo@example.com",
          phone: "+20 123 456 7890",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
        };

        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return;
      }

      throw new Error("Invalid email or password");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (
    userData: Omit<User, "id"> & { password: string },
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create a new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}`,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        loginWithUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
