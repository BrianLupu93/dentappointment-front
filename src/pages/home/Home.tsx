import { Button } from "@/components/ui/button";
import ClientForm from "./components/ClientForm";
import HomeCalendar from "./components/HomeCalendar";
import HompageTitle from "./components/HompageTitle";
import ServiceSelector from "./components/ServiceSelector";
import TimeSelector from "./components/TimeSelector";
import { useAppointment } from "./context/appointmentContext";
import AppFrame from "@/components/AppFrame";
import { useAppDialog } from "@/context/dialog/AppDialogContext";
import { useRef } from "react";
import { handleForm, showToast } from "@/lib/utils";
import DialogElement from "@/components/DialogElement";
import { apiHandler } from "@/context/api/apiHandler";
import { routes } from "@/context/api/routes";
import type { Appointment } from "./context/types";

const Home = () => {
  const { state, dispatch } = useAppointment();
  const dialog = useAppDialog();
  const formRef = useRef<HTMLFormElement>(null);

  function checkAppointmentBeforeSubmit() {
    // Check the client info with the handleForm()
    const formData = handleForm(formRef);
    if (!formData) return;

    if (
      !state.selectedDay ||
      !state.selectedService ||
      !state.selectedStartTime ||
      !state.availableSlots.length
    ) {
      showToast("Please check your Appointment selection!", "error");
      return;
    }
    const appointmentData = {
      clientInfo: formData,
      service: state.selectedService,
      date: state.selectedDay,
      startTime: state.selectedStartTime,
    };

    dialog.open({
      title: "The Appointment data is correct?",
      description: "This cannot be undone",
      content: (
        <div>
          <DialogElement label='Full Name' text={formData.fullName} />
          <DialogElement label='E-mail' text={formData.email} />
          <DialogElement label='Phone' text={formData.phone} />
          <DialogElement label='Date' text={state.selectedDay} />
          <DialogElement label='Service' text={state.selectedService.name} />
          <DialogElement label='Time' text={state.selectedStartTime} />
        </div>
      ),
      actions: [
        { label: "Cancel", variant: "outline" },
        {
          label: "Confirm",
          variant: "default",
          onClick: () => postAppointment(appointmentData),
        },
      ],
    });
  }

  async function postAppointment(data: Appointment) {
    try {
      await apiHandler(
        `${routes.appointment}`,
        dispatch,
        () => ({ type: "RESET_APPOINTMENT_STATE" }),
        { method: "POST", body: data },
      );
    } catch (err) {
      console.error(err);
    }
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
