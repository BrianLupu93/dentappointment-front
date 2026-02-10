interface DialogElementProps {
  label: string;
  text: string;
}

const DialogElement = ({ label, text }: DialogElementProps) => {
  return (
    <div className='flex gap-2'>
      {label}
      <span className='font-semibold'>{text}</span>
    </div>
  );
};

export default DialogElement;
