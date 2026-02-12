import { showToast } from "@/lib/utils";
import { routes } from "@/context/api/routes";

export async function validateInviteToken(
  token: string,
  setValid: (v: boolean) => void,
  setInviteEmail: (v: string) => void,
  setLoading: (v: boolean) => void,
) {
  try {
    const res = await fetch(`${routes.auth}/validate-invite?token=${token}`);
    const data = await res.json();

    if (!data.valid) {
      showToast("Invalid or expired invite link", "error");
      setValid(false);
    } else {
      setValid(true);
      setInviteEmail(data.email);
    }
  } catch (err) {
    showToast("Server error validating invite", "error");
    setValid(false);
  } finally {
    setLoading(false);
  }
}

export async function handleRegister(
  nameRef: React.RefObject<HTMLInputElement | null>,
  emailRef: React.RefObject<HTMLInputElement | null>,
  pwdRef: React.RefObject<HTMLInputElement | null>,
  repeatPwdRef: React.RefObject<HTMLInputElement | null>,
  inviteToken: string | null,
  navigate: any,
) {
  const name = nameRef.current?.value.trim() || "";
  const email = emailRef.current?.value.trim() || "";
  const password = pwdRef.current?.value.trim() || "";
  const repeatPassword = repeatPwdRef.current?.value.trim() || "";

  if (!inviteToken) {
    showToast("Invalid or missing invite token", "error");
    return;
  }

  if (!name) {
    showToast("Please enter your name", "error");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  if (!password) {
    showToast("Please enter a password", "error");
    return;
  }

  if (password !== repeatPassword) {
    showToast("Passwords do not match", "error");
    return;
  }

  try {
    const res = await fetch(`${routes.auth}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, inviteToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.message || "Registration failed", "error");
      return;
    }

    showToast("Account created successfully!", "success");
    navigate("/login");
  } catch (err) {
    showToast("Something went wrong. Please try again.", "error");
  }
}
