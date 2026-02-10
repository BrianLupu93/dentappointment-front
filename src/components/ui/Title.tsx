import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto'>
      <div className='w-full flex justify-center items-end mb-10 text-2xl sm:text-4xl '>
        {children}
      </div>
    </div>
  );
};

export default Title;
