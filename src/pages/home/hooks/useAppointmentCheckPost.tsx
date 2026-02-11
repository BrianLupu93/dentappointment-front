import { useAppDialog } from "@/context/dialog/AppDialogContext";
import DialogElement from "@/components/DialogElement";
import { handleForm, showToast } from "@/lib/utils";

export function useAppointmentCheckPost() {
  const dialog = useAppDialog();

  function confirmAppointment({
    formRef,
    state,
    onConfirm,
  }: {
    formRef: React.RefObject<HTMLFormElement | null>;
    state: {
      selectedDay: string | null;
      selectedService: any | null;
      selectedStartTime: string | null;
      availableSlots: any[];
    };
    onConfirm: (data: any) => void;
  }) {
    // Validate form
    const formData = handleForm(formRef);
    if (!formData) return;

    // Validate appointment selections
    if (
      !state.selectedDay ||
      !state.selectedService ||
      !state.selectedStartTime ||
      !state.availableSlots.length
    ) {
      showToast("Please check your Appointment selection!", "error");
      return;
    }

    // Build appointment data
    const appointmentData = {
      clientInfo: formData,
      service: state.selectedService,
      date: state.selectedDay,
      startTime: state.selectedStartTime,
    };

    // Open confirmation dialog
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
          onClick: () => onConfirm(appointmentData),
        },
      ],
    });
  }

  return { confirmAppointment };
}
