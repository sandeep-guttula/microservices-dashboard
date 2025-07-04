import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, ServiceFormValues } from "@/lib/validation/serviceSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SERVICE_STATUSES, SERVICE_TYPES } from "@/lib/constants";
import { useUpdateService } from "@/hooks/useUpdateService";
import { Service } from "@/types/types";

interface EditServiceModalProps {
  onOpenChange: (open: boolean) => void;
  service: Service;
}

export function EditServiceModal({ onOpenChange, service }: EditServiceModalProps) {
  const { mutate: updateService, isPending } = useUpdateService();

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: service.name,
      type: service.type,
      status: service.status,
    },
  });

  useEffect(() => {
    form.reset({
      name: service.name,
      type: service.type,
      status: service.status,
    });
  }, [service, form]);

  const onSubmit = (values: ServiceFormValues) => {
    updateService({ ...service, ...values }, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogDescription>
          Make changes to your service here.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            {...form.register("name")}
            className="col-span-3"
          />
          {form.formState.errors.name && (
            <p className="col-span-4 text-right text-red-500 text-xs">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Select
            onValueChange={(value) =>
              form.setValue("type", value as "API" | "Database" | "Queue")
            }
            defaultValue={form.watch("type")}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.type && (
            <p className="col-span-4 text-right text-red-500 text-xs">
              {form.formState.errors.type.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select
            onValueChange={(value) =>
              form.setValue(
                "status",
                value as "Online" | "Degraded" | "Offline"
              )
            }
            defaultValue={form.watch("status")}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.status && (
            <p className="col-span-4 text-right text-red-500 text-xs">
              {form.formState.errors.status.message}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
