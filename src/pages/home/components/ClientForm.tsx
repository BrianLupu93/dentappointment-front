import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

type ClientFormProps = {};

const ClientForm = forwardRef<HTMLFormElement, ClientFormProps>(
  (props, ref) => {
    return (
      <form
        className='w-full sm:w-1/2 flex flex-col gap-4 items-center'
        ref={ref}
      >
        <div className='text-left font-semibold'>Personal information:</div>
        <Input
          placeholder='Full Name'
          name='fullName'
          type='text'
          autoComplete='on'
        />
        <Input
          placeholder='E-mail'
          name='email'
          type='email'
          autoComplete='on'
        />
        <Input placeholder='Phone' name='phone' type='text' autoComplete='on' />
      </form>
    );
  },
);

ClientForm.displayName = "ClientForm";

export default ClientForm;
