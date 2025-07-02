"use client";

import { LuPencilLine } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { ServiceCardProps } from "@/types/types";
import { BsDatabase } from "react-icons/bs";

const statusColors: Record<string, string> = {
  Online: "bg-green-100 text-green-800",
  Offline: "bg-gray-100 text-gray-800",
  Degraded: "bg-yellow-100 text-yellow-800",
};

const ServiceCard = ({
  title,
  status,
  type,
  id,
  description,
}: ServiceCardProps) => {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex flex-1 gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className="bg-blue-600 text-white p-3 rounded-lg">
            <BsDatabase className="w-6 h-6" />
          </div>
        </div>

        {/* Text Info */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-1 items-center">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
            >
              ● {status}
            </span>
            <span>{type}</span>
            <span>• ID: {id}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 items-center sm:items-start">
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
          <LuPencilLine className="mr-1" /> Edit Service
        </button>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md">
          <FaRegTrashCan className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
