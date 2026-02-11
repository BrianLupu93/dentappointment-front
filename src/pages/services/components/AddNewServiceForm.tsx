import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type RefType = React.RefObject<HTMLInputElement | null>;

interface AddNewServiceFormProps {
  handleClick: () => void;
  serviceNameRef: RefType;
  serviceDurationRef: RefType;
}

const AddNewServiceForm = ({
  handleClick,
  serviceNameRef,
  serviceDurationRef,
}: AddNewServiceFormProps) => {
  return (
    <form className='flex gap-4 items-center'>
      <Input
        placeholder='Service name'
        type='text'
        className='w-5/12 sm:w-7/12'
        ref={serviceNameRef}
        name='name'
      />
      <Input
        placeholder='min'
        type='number'
        className='w-2/12 sm:w-1/12 no-spinner'
        min={15}
        max={120}
        ref={serviceDurationRef}
        name='duration'
      />
      <div className='w-2/12 sm:w-4/12 justify-end'>
        <Button type='button' onClick={handleClick}>
          Add service
        </Button>
      </div>
    </form>
  );
};

export default AddNewServiceForm;
