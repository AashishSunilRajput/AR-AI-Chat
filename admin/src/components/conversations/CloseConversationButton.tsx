"use client";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  onClose: () => Promise<void>;
  loading?: boolean;
}

export default function CloseConversationButton({
  onClose,
  loading,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          disabled={loading}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          Close Conversation
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Close Conversation?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This conversation will be marked as closed.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={async () => {
              try {
                await onClose();
                toast.success("Conversation closed successfully");
              } catch {
                toast.error("Unable to close conversation");
              }
            }}
          >
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}