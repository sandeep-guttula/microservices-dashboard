"use client";
import { Service } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditServiceModal } from "@/components/dashboard/EditServiceModal";
import { DeleteConfirmModal } from "@/components/dashboard/DeleteConfirmModal";
import { useState } from "react";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Service Details</CardTitle>
        <div className="flex space-x-2">
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FaEdit className="h-4 w-4 mr-2" /> Edit
              </Button>
            </DialogTrigger>
            <EditServiceModal
              service={service}
              onOpenChange={setIsEditModalOpen}
            />
          </Dialog>
          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <FaTrash className="h-4 w-4 mr-2" /> Delete
              </Button>
            </DialogTrigger>
            <DeleteConfirmModal
              service={service}
              onOpenChange={setIsDeleteModalOpen}
            />
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-2xl font-bold">{service.name}</p>
          <p className="text-sm text-muted-foreground">{service.id}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Type</p>
            <p className="text-lg">{service.type}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Status</p>
            <StatusBadge status={service.status} />
          </div>
          <div>
            <p className="text-sm font-medium">Last Check</p>
            <p className="text-lg">{service.lastCheck}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
