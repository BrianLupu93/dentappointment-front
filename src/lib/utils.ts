import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDay(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // luni sunt 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function handleForm(formRef: React.RefObject<HTMLFormElement | null>) {
  const form = formRef.current;
  if (!form) return;

  const fullName =
    (form.elements.namedItem("fullName") as HTMLInputElement)?.value.trim() ||
    "";
  const email =
    (form.elements.namedItem("email") as HTMLInputElement)?.value.trim() || "";
  const phone =
    (form.elements.namedItem("phone") as HTMLInputElement)?.value.trim() || "";

  const focusField = (name: string) => {
    const el = form.elements.namedItem(name) as HTMLInputElement | null;
    el?.focus();
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fullName) {
    showToast("Please insert the Full Name", "error");
    focusField("fullName");
    return;
  }

  if (!email) {
    showToast("Please insert the Email", "error");
    focusField("email");
    return;
  }

  if (!emailRegex.test(email)) {
    showToast("Please insert a valid Email", "error");
    focusField("email");
    return;
  }

  if (!phone) {
    showToast("Please insert the Phone", "error");
    focusField("phone");
    return;
  }

  return { fullName, email, phone };
}

type ToastType = "success" | "error" | "warning" | "info" | "default";

export function showToast(message: string, type: ToastType = "default") {
  switch (type) {
    case "success":
      toast.success(message, { position: "top-right" });
      break;
    case "error":
      toast.error(message, { position: "top-right" });
      break;
    case "warning":
      toast.warning(message, { position: "top-right" });
      break;
    case "info":
      toast.info(message, { position: "top-right" });
      break;
    default:
      toast(message, { position: "top-right" });
  }
}
