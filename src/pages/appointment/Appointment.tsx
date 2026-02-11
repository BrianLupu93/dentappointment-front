import { Button } from "@/components/ui/button";
import ClientForm from "./components/ClientForm";
import ServiceSelector from "./components/ServiceSelector";
import TimeSelector from "./components/TimeSelector";
import AppFrame from "@/components/AppFrame";
import { useRef } from "react";
import { useAppointment } from "@/context/appointment/appointmentContext";
import { postAppointment } from "./handlers/handlers";
import { useAppointmentCheckPost } from "./hooks/useAppointmentCheckPost";
import AppointmentTitle from "./components/AppointmentTitle";
import AppointmentCalendar from "./components/AppointmentCalendar";

const Appointment = () => {
  const { state, dispatch } = useAppointment();
  const { confirmAppointment } = useAppointmentCheckPost();
  const formRef = useRef<HTMLFormElement>(null);

  function checkAppointmentBeforeSubmit() {
    confirmAppointment({
      formRef,
      state,
      onConfirm: (appointmentData) =>
        postAppointment(appointmentData, formRef, dispatch),
    });
  }

  return (
    <>
      <div className='mx-auto'>
        <AppointmentTitle />
      </div>
      <AppFrame>
        <div className='flex flex-col sm:flex-row gap-4 items-center mb-4'>
          <div className='flex flex-col w-full sm:w-1/2 gap-6'>
            <ClientForm ref={formRef} />
            <div className='flex flex-wrap font-semibold items-center gap-4 mb-4 mt-8'>
              <span>Selected day:</span>
              <span className='bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded-sm'>
                {state.selectedDay}
              </span>
            </div>
          </div>

          <AppointmentCalendar />
        </div>

        <div className='flex flex-col items-start gap-4 mb-4'>
          <div className='text-left font-semibold'>Select a service</div>
          <ServiceSelector />
        </div>
        <div className='flex flex-col items-start gap-4 mb-6'>
          <div className="className='text-left font-semibold">Select time</div>
          <TimeSelector />
        </div>
        <Button onClick={checkAppointmentBeforeSubmit}>
          Create Appointment
        </Button>
      </AppFrame>
    </>
  );
};

export default Appointment;
