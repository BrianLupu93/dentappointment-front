import { useAppDialog } from "@/context/dialog/AppDialogContext";
import DialogElement from "@/components/DialogElement";
import { showToast } from "@/lib/utils";

export function useServiceCheckUpdate() {
  const dialog = useAppDialog();

  function confirmUpdate({
    id,
    nameRef,
    durationRef,
    activeRef,
    onConfirm,
  }: {
    id: string;
    nameRef: React.RefObject<HTMLInputElement | null>;
    durationRef: React.RefObject<HTMLInputElement | null>;
    activeRef: React.RefObject<HTMLInputElement | null>;

    onConfirm: (data: {
      id: string;
      name: string;
      duration: number;
      active: boolean;
    }) => void;
  }) {
    const nameInput = nameRef.current;
    const durationInput = durationRef.current;
    const activeInput = activeRef.current;

    if (!nameInput || !durationInput || !activeInput) {
      console.error("Refs are null — form not mounted");
      return;
    }

    const name = nameInput.value.trim();
    const duration = Number(durationInput.value);
    const active = activeInput.checked;

    // Validate
    if (!name) {
      showToast("Please type the service name!", "error");
      nameInput.focus();
      return;
    }

    if (!duration) {
      showToast("Please type the service duration!", "error");
      durationInput.focus();
      return;
    }

    const min = Number(durationInput.min);
    const max = Number(durationInput.max);

    if (duration < min || duration > max) {
      showToast(`Duration must be between ${min} and ${max} minutes!`, "error");
      durationInput.focus();
      return;
    }

    // Open dialog
    dialog.open({
      title: "Confirm service update",
      description: "Are you sure you want to update this service?",
      content: (
        <div>
          <DialogElement label='Name' text={name} />
          <DialogElement label='Duration' text={duration.toString()} />
          <DialogElement label='Active' text={active ? "Yes" : "No"} />
        </div>
      ),
      actions: [
        { label: "Cancel", variant: "outline" },
        {
          label: "Update",
          variant: "default",
          onClick: () =>
            onConfirm({
              id,
              name,
              duration,
              active,
            }),
        },
      ],
    });
  }

  return { confirmUpdate };
}
