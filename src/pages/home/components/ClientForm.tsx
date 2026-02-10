import { Input } from "@/components/ui/input";

const ClientForm = () => {
  return (
    <div className='w-full sm:w-1/2 flex flex-col gap-4 items-start'>
      <div>Personal information</div>
      <Input placeholder='Full Name' />
      <Input placeholder='E-mail' />
      <Input placeholder='Phone' />
    </div>
  );
};

export default ClientForm;
