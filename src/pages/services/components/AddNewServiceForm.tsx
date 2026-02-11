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
        className='w-6/12 sm:w-8/12'
        ref={serviceNameRef}
        name='name'
      />
      <Input
        placeholder='min'
        type='number'
        className='w-3/12 sm:w-2/12 no-spinner'
        min={15}
        max={120}
        ref={serviceDurationRef}
        name='duration'
      />
      <Button type='button' onClick={handleClick}>
        Add
      </Button>
    </form>
  );
};

export default AddNewServiceForm;
