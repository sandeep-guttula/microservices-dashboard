"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
// import { useDashboardStore } from "@/lib/stores/dashboardStore";
// import { cn } from "@/lib/utils";

export function FiltersBar() {
  //   const {
  //     statusFilter,
  //     typeFilter,
  //     searchQuery,
  //     setStatusFilter,
  //     setTypeFilter,
  //     setSearchQuery,
  //   } = useDashboardStore();

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-md border p-4 bg-muted/50 w-full">
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search services..." value="" className="pl-9" />
      </div>

      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Online">Online</SelectItem>
            <SelectItem value="Offline">Offline</SelectItem>
            <SelectItem value="Degraded">Degraded</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="API">API</SelectItem>
            <SelectItem value="Database">Database</SelectItem>
            <SelectItem value="Queue">Queue</SelectItem>
            <SelectItem value="Cache">Cache</SelectItem>
            <SelectItem value="Gateway">Gateway</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
