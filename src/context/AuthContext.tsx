import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, AuthResponse } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<AuthResponse>;
  loginWithGoogle: (googleProfile?: { email: string; name: string; picture?: string }) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<AuthResponse>;
  logout: () => void;
  syncUserData: (cartItems: any[], wishlistIds: string[]) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('neek_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('neek_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('neek_auth_user');
    }
  }, [user]);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data: AuthResponse = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        closeAuthModal();
      }
      return data;
    } catch (err: any) {
      return { success: false, message: err?.message || 'Login failed' };
    }
  };

  const loginWithGoogle = async (googleProfile?: {
    email: string;
    name: string;
    picture?: string;
  }): Promise<AuthResponse> => {
    try {
      const payload = googleProfile || {
        email: 'abhishekkumar526732@gmail.com',
        name: 'Abhishek Kumar',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      };

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data: AuthResponse = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        closeAuthModal();
      }
      return data;
    } catch (err: any) {
      return { success: false, message: err?.message || 'Google Sign-In failed' };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<AuthResponse> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data: AuthResponse = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        closeAuthModal();
      }
      return data;
    } catch (err: any) {
      return { success: false, message: err?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const syncUserData = async (cartItems: any[], wishlistIds: string[]): Promise<boolean> => {
    if (!user?.email) return false;

    try {
      const formattedCart = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      await fetch('/api/auth/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          cart: formattedCart,
          wishlist: wishlistIds,
        }),
      });

      return true;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        login,
        loginWithGoogle,
        register,
        logout,
        syncUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
