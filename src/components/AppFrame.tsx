import React from "react";

interface AppFrameProps {
  children: React.ReactNode;
  extraClass?: string;
}

const AppFrame = ({ children, extraClass = "" }: AppFrameProps) => {
  return (
    <div
      className={`w-full flex-col sm:flex-row gap-4 p-4 sm:p-6 border border-black dark:border-white rounded-md ${extraClass}`}
    >
      {children}
    </div>
  );
};

export default AppFrame;
