"use client";

import React, { createContext, useReducer, useContext } from "react";
import type { AppointmentState } from "./types";
import { formatDay } from "@/lib/utils";
import { appointmentReducer } from "./appointmentReducer";
import type { AppointmentAction } from "./appointmentActions";

export const initialState: AppointmentState = {
  services: [],
  selectedService: null,
  availableSlots: [],
  selectedStartTime: null,
  currentDate: new Date(),
  selectedDay: formatDay(new Date()),
  calendarAvailability: [],
  loading: false,
  error: "",
};

const AppointmentContext = createContext<{
  state: AppointmentState;
  dispatch: React.Dispatch<AppointmentAction>;
} | null>(null);

export const AppointmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);
  return (
    <AppointmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context)
    throw new Error("useAppointment must be used within AppProvider");
  return context;
};
