import { useAppDialog } from "@/context/dialog/AppDialogContext";
import DialogElement from "@/components/DialogElement";

export function useServiceCheckDelete() {
  const dialog = useAppDialog();

  function confirmDelete({
    name,
    id,
    onConfirm,
  }: {
    name: string;
    id: string;
    onConfirm: (id: string) => void;
  }) {
    dialog.open({
      title: "Are you sure you want to delete this service?",
      description: "This action cannot be undone.",
      content: (
        <div>
          <DialogElement label='Service Name' text={name} />
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
