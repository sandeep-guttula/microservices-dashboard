"use client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useVisibilityRefresh(queryKeys: readonly unknown[][]) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        queryKeys.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [queryKeys, queryClient]);
}
