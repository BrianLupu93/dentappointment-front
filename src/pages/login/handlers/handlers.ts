import { showToast } from "@/lib/utils";
import type { NavigateFunction } from "react-router";

// ----------------- LOGIN HANDLER LOGIC ------------------
export async function handleLogin(
  emailRef: React.RefObject<HTMLInputElement | null>,
  pwdRef: React.RefObject<HTMLInputElement | null>,
  login: (email: string, password: string) => Promise<void>,
  navigate: NavigateFunction,
) {
  const email = emailRef.current?.value.trim() || "";
  const password = pwdRef.current?.value.trim() || "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  if (!password) {
    showToast("Please enter the password", "error");
    return;
  }

  try {
    await login(email, password);
    showToast("Logged in successfully!", "success");
    navigate("/dashboard");
  } catch (err) {
    showToast("Invalid email or password", "error");
  }
}
