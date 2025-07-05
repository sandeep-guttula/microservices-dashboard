import { Skeleton } from "@/components/ui/skeleton";

export function ServiceDetailsSkeleton() {
  return (
    <div className="bg-background min-h-screen flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-6xl">
        <div className="flex items-center mb-4">
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="px-6 py-4 border-b">
                <Skeleton className="h-6 w-1/3" />
              </div>
              <div className="p-6 space-y-4">
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-3 w-1/4" />
                <div className="space-y-2 pt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="px-6 py-4 border-b">
                <Skeleton className="h-6 w-1/3" />
              </div>
              <div className="p-6 space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="px-6 py-4 border-b">
                <Skeleton className="h-6 w-1/3" />
              </div>
              <div className="p-6 space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="px-6 py-4 border-b">
                <Skeleton className="h-6 w-1/3" />
              </div>
              <div className="p-6 space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
