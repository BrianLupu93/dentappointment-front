import { useAppDialog } from "@/context/dialog/AppDialogContext";
import { showToast } from "@/lib/utils";
import DialogElement from "@/components/DialogElement";

export function useServiceCheckPost() {
  const dialog = useAppDialog();

  function checkBeforeSubmit({
    nameRef,
    durationRef,
    onConfirm,
  }: {
    nameRef: React.RefObject<HTMLInputElement | null>;
    durationRef: React.RefObject<HTMLInputElement | null>;
    onConfirm: (data: { name: string; duration: number }) => void;
  }) {
    const nameInput = nameRef?.current;
    const durationInput = durationRef?.current;

    // Refs might be null
    if (!nameInput || !durationInput) {
      console.error("Service form refs are not attached");
      return;
    }

    const name = nameInput.value.trim();
    const duration = Number(durationInput.value);

    // Validate name
    if (!name) {
      showToast("Please type the service name!", "error");
      nameInput.focus();
      return;
    }

    // Validate duration
    if (!duration) {
      showToast("Please type the service duration!", "error");
      durationInput.focus();
      return;
    }

    // Validate min/max
    const min = Number(durationInput.min);
    const max = Number(durationInput.max);

    if (duration < min || duration > max) {
      showToast(`Duration must be between ${min} and ${max} minutes!`, "error");
      durationInput.focus();
      return;
    }

    // Open confirmation dialog
    dialog.open({
      title: "Are the service information correct?",
      description: "This cannot be undone",
      content: (
        <div>
          <DialogElement label='Service Name' text={name} />
          <DialogElement label='Service Duration' text={duration.toString()} />
        </div>
      ),
      actions: [
        { label: "Cancel", variant: "outline" },
        {
          label: "Confirm",
          variant: "default",
          onClick: () => onConfirm({ name, duration }),
        },
      ],
    });
  }

  return { checkBeforeSubmit };
}
