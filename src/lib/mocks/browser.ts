import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export async function startWorker() {
  if (typeof window === "undefined") {
    return;
  }
  await worker.start({
    onUnhandledRequest: "warn",
  });
  console.log("[MSW] Worker started and ready for interception.");
}
