import React, { createContext, useReducer, useContext } from "react";

import { formatDay } from "@/lib/utils";
import type { ServiceState } from "./serviceTypes";
import type { ServiceAction } from "./serviceAction";
import { serviceReducer } from "./serviceReducer";

export const initialState: ServiceState = {
  services: [],
  selectedService: null,
  currentDate: new Date(),
  selectedDay: formatDay(new Date()),
};

const ServiceContext = createContext<{
  state: ServiceState;
  dispatch: React.Dispatch<ServiceAction>;
} | null>(null);

export const ServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(serviceReducer, initialState);
  return (
    <ServiceContext.Provider value={{ state, dispatch }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context)
    throw new Error("useService must be used within ServiceProvider");
  return context;
};
