import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteService } from "@/hooks/useDeleteService";
import { Service } from "@/types/types";

interface DeleteConfirmModalProps {
  onOpenChange: (open: boolean) => void;
  service: Service;
}

export function DeleteConfirmModal({ onOpenChange, service }: DeleteConfirmModalProps) {
  const { mutate: deleteService, isPending } = useDeleteService();

  const handleDelete = () => {
    deleteService(service.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Delete Service</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the service &quot;{service.name}&quot;? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
