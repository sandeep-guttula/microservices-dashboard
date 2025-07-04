import { memo, useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineQueueList, HiOutlineGlobeAlt } from "react-icons/hi2";
import { FiDatabase } from "react-icons/fi";
import { motion } from "framer-motion";
import { Service } from "@/types/types";
import { usePollServiceStatus } from "@/hooks/usePollServiceStatus";
import { StatusBadge } from "./StatusBadge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditServiceModal } from "./EditServiceModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

const typeIcons = {
  API: <HiOutlineGlobeAlt className="text-xl text-gray-500" />,
  Database: <FiDatabase className="text-xl text-gray-500" />,
  Queue: <HiOutlineQueueList className="text-xl text-gray-500" />,
  Other: <div />,
  Cache: <div />,
  Gateway: <div />,
};

interface ServiceRowProps {
  service: Service;
}

export const ServiceRow = memo(({ service }: ServiceRowProps) => {
  const { service: polledService } = usePollServiceStatus(service.id);
  const displayStatus = polledService?.status || service.status;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b hover:bg-gray-50"
    >
      <td className="px-6 py-4 flex items-center gap-3">
        {typeIcons[service.type]}
        <Link href={`/services/${service.id}`} className="hover:underline">
          <p className="font-medium">{service.name}</p>
          <p className="text-xs text-gray-500">{service.id}</p>
        </Link>
      </td>
      <td className="px-6 py-4">
        <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">
          {service.type}
        </span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={displayStatus} />
      </td>
      <td className="px-6 py-4">
        {polledService?.lastCheck || service.lastCheck}
      </td>
      <td className="px-6 py-4 text-right space-x-3">
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <button
              className="text-gray-600 hover:text-blue-600"
              aria-label={`Edit ${service.name}`}
            >
              <FaEdit />
            </button>
          </DialogTrigger>
          <EditServiceModal
            service={service}
            onOpenChange={setIsEditModalOpen}
          />
        </Dialog>
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogTrigger asChild>
            <button
              className="text-gray-600 hover:text-red-600"
              aria-label={`Delete ${service.name}`}
            >
              <FaTrash />
            </button>
          </DialogTrigger>
          <DeleteConfirmModal
            service={service}
            onOpenChange={setIsDeleteModalOpen}
          />
        </Dialog>
      </td>
    </motion.tr>
  );
});

ServiceRow.displayName = "ServiceRow";
