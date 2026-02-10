import AppFrame from "@/components/AppFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/ui/Title";
import React from "react";

const Service = ({ name, duration, active, id }) => {
  return (
    <form className='flex gap-2 sm:gap-4 items-center'>
      <Input defaultValue={name} type='text' className='w-6/12 sm:w-8/12' />
      <Input
        defaultValue={duration}
        type='number'
        className='w-3/12 sm:w-2/12 no-spinner'
        min={15}
        max={120}
      />
      <Input
        defaultValue={active}
        type='checkbox'
        className='w-4 h-4 mx-auto'
      />
    </form>
  );
};

const Services = () => {
  const services = [
    { id: "id1", name: "serviceName1", duration: 30, active: true },
    { id: "id2", name: "serviceName2", duration: 30, active: true },
    { id: "id3", name: "serviceName3", duration: 30, active: true },
    { id: "id4", name: "serviceName4", duration: 30, active: true },
  ];
  return (
    <>
      <Title children='Service management' />
      <AppFrame>
        <div className=' flex mb-4 font-semibold'>Available services:</div>
        <div className='flex mb-4 gap-2 sm:gap-4 text-sm'>
          <span className='w-6/12 sm:w-8/12'>Service Name</span>
          <span className='w-3/12 sm:w-2/12'>Duration</span>
          <span className='mx-auto'>Active</span>
        </div>
        <div className='flex flex-col gap-4 mb-10'>
          {services.map((service) => {
            return (
              <Service
                name={service.name}
                duration={service.duration}
                active={service.active}
              />
            );
          })}
        </div>
        <div className=' flex mb-4 font-semibold'>Add a new Service:</div>
        <form className='flex gap-4 items-center'>
          <Input
            placeholder='Service name'
            type='text'
            className='w-6/12 sm:w-8/12'
          />
          <Input
            placeholder='min'
            type='number'
            className='w-3/12 sm:w-2/12 no-spinner'
            min={15}
            max={120}
          />
          <Button> Add</Button>
        </form>
      </AppFrame>
    </>
  );
};

export default Services;
