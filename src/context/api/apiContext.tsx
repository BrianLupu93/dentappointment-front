"use client";
import React, { createContext, useReducer, useContext } from "react";
import type { ApiAction, ApiState } from "./apiTypes";

function apiReducer(state: ApiState, action: ApiAction): ApiState {
  switch (action.type) {
    case "API_START":
      return {
        ...state,
        [action.key]: { loading: true, error: undefined, data: undefined },
      };
    case "API_SUCCESS":
      return {
        ...state,
        [action.key]: {
          loading: false,
          error: undefined,
          data: action.payload,
        },
      };
    case "API_ERROR":
      return {
        ...state,
        [action.key]: {
          loading: false,
          error: action.payload,
          data: undefined,
        },
      };
    default:
      return state;
  }
}

const ApiContext = createContext<{
  state: ApiState;
  dispatch: React.Dispatch<ApiAction>;
} | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(apiReducer, {});
  return (
    <ApiContext.Provider value={{ state, dispatch }}>
      {children}
    </ApiContext.Provider>
  );
};

// Hook custom
export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context)
    throw new Error("useApiContext must be used within ApiProvider");
  return context;
};
