import React, { createContext, useContext, useState } from "react";

export type DialogAction = {
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  onClick?: () => void | Promise<void>;
};

export type AppDialogOptions = {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  actions?: DialogAction[];
};

export type DialogContextType = {
  options: AppDialogOptions;
  isOpen: boolean;
  open: (options: AppDialogOptions) => void;
  close: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function useAppDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useAppDialog must be used inside DialogProvider");
  return ctx;
}

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AppDialogOptions>({});

  const open = (opts: AppDialogOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ options, isOpen, open, close }}>
      {children}
    </DialogContext.Provider>
  );
}
