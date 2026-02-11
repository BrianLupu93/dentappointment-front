import { createContext, useContext, useState, useEffect } from "react";
import { routes } from "../api/routes";
import { showToast } from "@/lib/utils";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export let refreshAccessToken: () => Promise<string | null>;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("user");
      if (!saved || saved === "undefined") return null;
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("accessToken");
  });

  const refreshToken = localStorage.getItem("refreshToken");

  // ---------------- LOGIN ----------------
  const login = async (email: string, password: string) => {
    const res = await fetch(`${routes.auth}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error("Invalid credentials");
    }
    const data = await res.json();
    setUser(data.user);
    setAccessToken(data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  };

  // ---------------- LOGOUT ----------------
  const logout = async () => {
    try {
      await fetch(`${routes.auth}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      showToast("Logout successfully!", "success");
    } catch (err) {
      showToast("Something went wrong! Please try again.", "error");
      console.error(err);
    }

    setUser(null);
    setAccessToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // ---------------- REFRESH TOKEN ----------------
  refreshAccessToken = async () => {
    if (!refreshToken) return null;

    try {
      const res = await fetch(`${routes.auth}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) return null;

      const data = await res.json();

      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);

      return data.accessToken;
    } catch {
      logout();
      return null;
    }
  };

  // Refresh on app start
  useEffect(() => {
    if (refreshToken && !accessToken) {
      refreshAccessToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
