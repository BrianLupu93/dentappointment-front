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
      toast.success(message, { position: "top-left" });
      break;
    case "error":
      toast.error(message, { position: "top-left" });
      break;
    case "warning":
      toast.warning(message, { position: "top-left" });
      break;
    case "info":
      toast.info(message, { position: "top-left" });
      break;
    default:
      toast(message, { position: "top-left" });
  }
}

// Helper: get Monday of the week
export function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  return d;
}
// Format Date
export function formatDate(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
// Is Same day helper
export function isSameCalendarDay(a: Date, b: Date | null) {
  if (!b) return false;
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}
// Change moth handler
export function changeWeek(
  weekStart: Date,
  setWeekStart: React.Dispatch<React.SetStateAction<Date>>,
  direction: "prev" | "next",
) {
  const newDate = new Date(weekStart);
  if (direction === "prev") {
    newDate.setDate(newDate.getDate() - 7);
  } else {
    newDate.setDate(newDate.getDate() + 7);
  }
  setWeekStart(newDate);
}
// Today helper for style
export function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
