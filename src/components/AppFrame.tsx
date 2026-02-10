import React from "react";

const AppFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full flex-col sm:flex-row gap-4 p-4 sm:p-6 border border-black dark:border-white rounded-md'>
      {children}
    </div>
  );
};

export default AppFrame;
