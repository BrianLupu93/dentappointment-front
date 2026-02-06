import React, { createContext, useContext, useReducer } from "react";
import { appointmentReducer, initialState } from "./AppointmentReducer";
import type { AppointmentState, AppointmentActions } from "./appointmentTypes";

interface AppointmentContextType {
  state: AppointmentState;
  dispatch: React.Dispatch<AppointmentActions>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined,
);

export function AppointmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);
  return (
    <AppointmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (!context)
    throw new Error("useAppointment must be used inside BookingProvider");
  return context;
}
