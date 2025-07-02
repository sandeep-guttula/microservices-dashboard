import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineQueueList, HiOutlineGlobeAlt } from "react-icons/hi2";
import { FiDatabase } from "react-icons/fi";
import { ServicesListProps, ServiceStatus } from "@/types/types";
import { Button } from "../ui/button";

const statusColors: Record<ServiceStatus, string> = {
  Online: "text-green-500",
  Degraded: "text-yellow-500",
  Offline: "text-red-500",
};

const typeIcons = {
  API: <HiOutlineGlobeAlt className="text-xl text-gray-500" />,
  Database: <FiDatabase className="text-xl text-gray-500" />,
  Queue: <HiOutlineQueueList className="text-xl text-gray-500" />,
};

export default function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm w-full">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">Services</h3>
        <p className="text-sm text-gray-500">Last updated: 2 seconds ago</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs border-b">
            <tr>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Last Check</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {services.map((service, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  {typeIcons[service.type]}
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-xs text-gray-500">{service.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                    {service.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${statusColors[service.status]}`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4">{service.lastCheck}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-gray-600 hover:text-blue-600">
                    <FaEdit />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-6 py-3 text-sm text-gray-600 border-t">
        <span>
          Showing {services.length > 0 ? `1 to ${services.length}` : 0} of{" "}
          {services.length} services
        </span>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
