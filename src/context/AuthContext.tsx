"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ---------------------------------------------------------------------------
// Mock auth helpers — swap these for real API calls (e.g. Supabase, Firebase)
// ---------------------------------------------------------------------------
const STORAGE_KEY = "qs_user";

function mockLogin(email: string, password: string): User {
  // In production replace with a real API call
  if (!email || !password) throw new Error("Invalid credentials.");
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed: User = JSON.parse(stored);
    if (parsed.email === email) return parsed;
  }
  throw new Error("No account found. Please sign up first.");
}

function mockSignup(name: string, email: string): User {
  // In production replace with a real API call
  const user: User = { id: crypto.randomUUID(), name, email };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const loggedIn = mockLogin(email, password);
    setUser(loggedIn);
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!password) throw new Error("Password is required.");
    const created = mockSignup(name, email);
    setUser(created);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
