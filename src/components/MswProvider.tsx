// src/components/MswProvider.tsx
"use client";

import { useEffect } from "react";
import { useMswStore } from "@/lib/stores/useMswStore";

export function MswProvider() {
  const mswReady = useMswStore((state) => state.mswReady);
  const setMswReady = useMswStore((state) => state.setMswReady);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("../lib/mocks/browser")
        .then(({ startWorker }) => {
          startWorker().then(() => {
            setMswReady(true);
            console.log("MSW worker is now fully ready.");
          });
        })
        .catch((error) => console.error("Failed to start MSW worker:", error));
    }
  }, [setMswReady]);

  if (
    !mswReady &&
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "development"
  ) {
    return null;
  }
}
