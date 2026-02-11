import React, { createContext, useReducer, useContext } from "react";

import { formatDay } from "@/lib/utils";
import type { DashboardState } from "./dashboardTypes";
import type { DashboardAction } from "./dashboardAction";
import { dashboardReducer } from "./dashboardReducer";

export const initialState: DashboardState = {
  currentDate: new Date(),
  selectedDay: formatDay(new Date()),
  appointments: [],
};

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
} | null>(null);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};
