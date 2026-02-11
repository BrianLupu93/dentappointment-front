import { useAppDialog } from "@/context/dialog/AppDialogContext";
import DialogElement from "@/components/DialogElement";

export function useAppointmentCheckDelete() {
  const dialog = useAppDialog();

  function confirmDelete({
    id,
    clientName,
    serviceName,
    date,
    time,
    onConfirm,
  }: {
    id: string;
    clientName: string;
    serviceName: string;
    date: string;
    time: string;
    onConfirm: (id: string) => void;
  }) {
    dialog.open({
      title: "Are you sure you want to delete this appointment?",
      description: "This action cannot be undone.",
      content: (
        <div className='space-y-2'>
          <DialogElement label='Client Name' text={clientName} />
          <DialogElement label='Service' text={serviceName} />
          <DialogElement label='Date' text={date} />
          <DialogElement label='Time' text={time} />
        </div>
      ),
      actions: [
        { label: "Cancel", variant: "outline" },
        {
          label: "Delete",
          variant: "destructive",
          onClick: () => onConfirm(id),
        },
      ],
    });
  }

  return { confirmDelete };
}
