import { Button } from "@/components/ui/button";

import { useAppDialog } from "../context/dialog/AppDialogContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function AppDialog() {
  const { isOpen, close, options } = useAppDialog();

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent className='sm:max-w-md rounded-2xl'>
        {(options.title || options.description) && (
          <DialogHeader>
            {options.title && <DialogTitle>{options.title}</DialogTitle>}
            {options.description && (
              <DialogDescription>{options.description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {options.content && <div className='py-4'>{options.content}</div>}

        {options.actions && options.actions.length > 0 && (
          <DialogFooter className='gap-2'>
            {options.actions.map((action, i) => (
              <Button
                key={i}
                variant={action.variant || "default"}
                onClick={async () => {
                  await action.onClick?.();
                  close();
                }}
              >
                {action.label}
              </Button>
            ))}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
