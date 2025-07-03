"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useServiceStore } from "@/lib/stores/useServiceStore";
import { Service } from "@/types/types";
import { PlusIcon } from "lucide-react";
import { SERVICE_TYPES, STATUS } from "@/lib/constants";
import { MdDownloadDone } from "react-icons/md";

import { toast } from "sonner";

export function AddServiceDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState(SERVICE_TYPES[0]);

  const addService = useServiceStore((s) => s.addService);

  const handleSubmit = async () => {
    if (!name || !type) return;
    const response = await fetch("/api/services", {
      method: "POST",
      body: JSON.stringify({ name, type, status: STATUS.ONLINE }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const newService: Service = await response.json();
      addService(newService);
      setOpen(false);
      setName("");
      setType(SERVICE_TYPES[0]);
      toast(`Service "${newService.name}" has been added.`, {
        duration: 3000,
        icon: <MdDownloadDone className="h-4 w-4 text-green-500" />,
      });
    } else {
      console.error("Failed to add service");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              placeholder="e.g. User Service"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Service Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map((serviceType) => (
                  <SelectItem key={serviceType} value={serviceType}>
                    {serviceType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={!name}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
}
