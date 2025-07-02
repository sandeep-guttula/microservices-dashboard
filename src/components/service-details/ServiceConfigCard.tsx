type ServiceConfigProps = {
  serviceName: string;
  serviceType: string;
  environment: string;
  endpoint: string;
  port: number;
  healthCheckInterval: string;
};

const ServiceConfigCard = ({
  serviceName,
  serviceType,
  environment,
  endpoint,
  port,
  healthCheckInterval,
}: ServiceConfigProps) => {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Service Configuration
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
        {/* Left column */}
        <div>
          <div className="text-sm text-gray-500">Service Name</div>
          <div className="font-medium text-gray-900">{serviceName}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Endpoint</div>
          <div className="font-medium text-gray-900">{endpoint}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Service Type</div>
          <div className="font-medium text-gray-900">{serviceType}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Port</div>
          <div className="font-medium text-gray-900">{port}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Environment</div>
          <div className="font-medium text-gray-900">{environment}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Health Check Interval</div>
          <div className="font-medium text-gray-900">{healthCheckInterval}</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceConfigCard;
