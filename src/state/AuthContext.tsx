import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { AUTH_KEY, REMEMBER_KEY, safeParseJSON } from "../utils/storage";

const DEMO_EMAIL = "intern@demo.com";
const DEMO_PASSWORD = "intern123";

interface AuthContextValue {
  isAuthenticated: boolean;
  rememberedEmail: string;
  login: (email: string, password: string, remember: boolean) => { ok: boolean; message?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialAuth = safeParseJSON<boolean>(localStorage.getItem(AUTH_KEY), false);
  const initialRemembered = localStorage.getItem(REMEMBER_KEY) ?? "";
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuth);
  const [rememberedEmail, setRememberedEmail] = useState(initialRemembered);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      rememberedEmail,
      login: (email, password, remember) => {
        if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
          return { ok: false, message: "Invalid email or password." };
        }
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_KEY, JSON.stringify(true));
        if (remember) {
          localStorage.setItem(REMEMBER_KEY, email);
          setRememberedEmail(email);
        } else {
          localStorage.removeItem(REMEMBER_KEY);
          setRememberedEmail("");
        }
        return { ok: true };
      },
      logout: () => {
        setIsAuthenticated(false);
        localStorage.setItem(AUTH_KEY, JSON.stringify(false));
      }
    }),
    [isAuthenticated, rememberedEmail]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
