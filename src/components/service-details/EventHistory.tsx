"use client";

import EventCard from "./EventCard";

const events = [
  {
    type: "success" as const,
    title: "Service came online",
    description: "Database connection restored after brief maintenance window",
    metadata: "Duration: 00:03:42 • Status: Online → Offline → Online",
    time: "2 minutes ago",
  },
  {
    type: "warning" as const,
    title: "Scheduled maintenance started",
    description: "Routine database optimization and index rebuilding",
    metadata: "Initiated by: SRE Team • Maintenance ID: MAINT-2024-001",
    time: "5 minutes ago",
  },
  {
    type: "error" as const,
    title: "High error rate detected",
    description: "Error rate exceeded 5% threshold (7.3% observed)",
    metadata: "Duration: 00:12:34 • Alert: CRITICAL • Resolved automatically",
    time: "2 hours ago",
  },
  {
    type: "info" as const,
    title: "Configuration updated",
    description: "Connection pool size increased from 50 to 75",
    metadata: "Updated by: john.doe@monitocorp.com • Change ID: CHG-2024-0127",
    time: "6 hours ago",
  },
  {
    type: "success" as const,
    title: "Health check passed",
    description: "All system checks completed successfully",
    metadata: "Response time: 142ms • CPU: 23% • Memory: 67%",
    time: "1 day ago",
  },
];

const EventHistory = () => {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Historical Events
        </h2>
        <div className="flex items-center gap-4">
          <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option>All Events</option>
            <option>Errors</option>
            <option>Warnings</option>
            <option>Successes</option>
          </select>
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 20h14v-2H5v2zm7-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.59 13.41L12 13.83l-3.59 3.58L7 16l5-5 5 5-1.41 1.41z" />
            </svg>
            Export
          </a>
        </div>
      </div>

      {/* Events */}
      <div>
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
          Load More Events
        </button>
      </div>
    </div>
  );
};

export default EventHistory;
