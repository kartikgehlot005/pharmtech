import { useActor } from "@caffeineai/core-infrastructure";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createActor } from "../backend";

interface AuthContextValue {
  isAdmin: boolean;
  sessionToken: string | null;
  isValidating: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "pg_admin_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useActor(createActor);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  // Validate stored session on mount
  useEffect(() => {
    if (isFetching || !actor) return;

    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) {
      setIsValidating(false);
      return;
    }

    actor
      .validateSession(stored)
      .then((valid) => {
        if (valid) {
          setSessionToken(stored);
          setIsAdmin(true);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
        setIsValidating(false);
      })
      .catch(() => {
        localStorage.removeItem(SESSION_KEY);
        setIsValidating(false);
      });
  }, [actor, isFetching]);

  const login = useCallback(
    async (
      username: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      if (!actor) return { success: false, error: "Not connected" };
      try {
        const result = await actor.adminLogin(username, password);
        if (result.__kind__ === "ok") {
          const token = result.ok;
          localStorage.setItem(SESSION_KEY, token);
          setSessionToken(token);
          setIsAdmin(true);
          return { success: true };
        }
        return { success: false, error: result.err };
      } catch {
        return { success: false, error: "Login failed. Please try again." };
      }
    },
    [actor],
  );

  const logout = useCallback(async () => {
    if (!actor || !sessionToken) return;
    try {
      await actor.adminLogout(sessionToken);
    } finally {
      localStorage.removeItem(SESSION_KEY);
      setSessionToken(null);
      setIsAdmin(false);
    }
  }, [actor, sessionToken]);

  return (
    <AuthContext.Provider
      value={{ isAdmin, sessionToken, isValidating, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
