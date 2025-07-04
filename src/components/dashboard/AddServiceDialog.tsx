"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateServiceModal } from "./CreateServiceModal";

export function AddServiceDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </DialogTrigger>
      <CreateServiceModal onOpenChange={setOpen} />
    </Dialog>
  );
}
