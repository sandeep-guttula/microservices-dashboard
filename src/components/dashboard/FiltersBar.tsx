"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICE_STATUSES, SERVICE_TYPES } from "@/lib/constants";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * A component that provides filtering options for the services list.
 * It uses the `useSearchParams` hook to manage the filter state in the URL,
 * allowing for bookmarkable and shareable filter configurations.
 */
export function FiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL search params
  const initialSearch = searchParams.get("search") || "";
  const initialStatus = searchParams.get("status") || "all";
  const initialType = searchParams.get("type") || "all";

  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 500);

  const [status, setStatus] = useState(initialStatus);
  const [type, setType] = useState(initialType);

  // Effect to update state when URL search params change (e.g., browser back/forward)
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setStatus(searchParams.get("status") || "all");
    setType(searchParams.get("type") || "all");
  }, [searchParams]);

  // Effect to update URL when debounced search term changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      newSearchParams.set("search", debouncedSearch);
    } else {
      newSearchParams.delete("search");
    }
    router.push(`?${newSearchParams.toString()}`);
  }, [debouncedSearch, router, searchParams]);

  // Effect to update URL when status filter changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (status && status !== "all") {
      newSearchParams.set("status", status);
    } else {
      newSearchParams.delete("status");
    }
    router.push(`?${newSearchParams.toString()}`);
  }, [status, router, searchParams]);

  // Effect to update URL when type filter changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (type && type !== "all") {
      newSearchParams.set("type", type);
    } else {
      newSearchParams.delete("type");
    }
    router.push(`?${newSearchParams.toString()}`);
  }, [type, router, searchParams]);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-md border border-border p-4 bg-muted/50 w-full">
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex gap-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
