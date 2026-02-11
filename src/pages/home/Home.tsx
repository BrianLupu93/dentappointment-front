import { Button } from "@/components/ui/button";
import ClientForm from "./components/ClientForm";
import HomeCalendar from "./components/HomeCalendar";
import HompageTitle from "./components/HompageTitle";
import ServiceSelector from "./components/ServiceSelector";
import TimeSelector from "./components/TimeSelector";
import AppFrame from "@/components/AppFrame";
import { useRef } from "react";
import { useAppointment } from "@/context/appointment/appointmentContext";
import { postAppointment } from "./handlers/handlers";
import { useAppointmentCheckPost } from "./hooks/useAppointmentCheckPost";

const Home = () => {
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
        <HompageTitle />
      </div>

      <AppFrame>
        <div className='flex flex-col sm:flex-row gap-4 items-center mb-4'>
          <ClientForm ref={formRef} />
          <HomeCalendar />
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

export default Home;
