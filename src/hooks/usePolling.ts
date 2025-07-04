"use client";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface UsePollingOptions {
  queryKey: unknown[];
  interval: number;
  enabled?: boolean;
}

export function usePolling({
  queryKey,
  interval,
  enabled = true,
}: UsePollingOptions) {
  const queryClient = useQueryClient();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      queryClient.invalidateQueries({ queryKey });
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [queryKey, interval, enabled, queryClient]);
}
