import { Input } from "@/components/ui/input";
import React from "react";
import ServiceSelector from "./ServiceSelector";
import TimeSelector from "./TimeSelector";

const ClientForm = () => {
  return (
    <div className='w-full sm:w-1/2 flex flex-col gap-4 items-start'>
      <div>Personal information</div>
      <Input placeholder='Full Name' />
      <Input placeholder='E-mail' />
      <Input placeholder='Phone' />
      <div className='mt-4 flex flex-col gap-4 items-start'>
        <div>Select a service</div>
        <ServiceSelector />
        <div>Select time</div>
        <TimeSelector />
      </div>
    </div>
  );
};

export default ClientForm;
