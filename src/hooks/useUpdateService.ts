import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Service } from "@/types/types";
import { updateService, createServiceEvent } from "@/lib/queries/services";
import { servicesKeys } from "../lib/queries/services";

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateService,
    onMutate: async (updatedService) => {
      await queryClient.cancelQueries({ queryKey: servicesKeys.lists() });
      await queryClient.cancelQueries({
        queryKey: servicesKeys.detail(updatedService.id),
      });

      const previousServices = queryClient.getQueryData<Service[]>(
        servicesKeys.lists()
      );
      const previousServiceDetail = queryClient.getQueryData<Service>(
        servicesKeys.detail(updatedService.id)
      );

      queryClient.setQueryData(
        servicesKeys.lists(),
        (old: Service[] | undefined) =>
          old?.map((service) =>
            service.id === updatedService.id ? updatedService : service
          )
      );
      queryClient.setQueryData(
        servicesKeys.detail(updatedService.id),
        updatedService
      );

      return { previousServices, previousServiceDetail };
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: servicesKeys.detail(data.id) });
      toast.success("Service updated successfully.");

      const previousService = (queryClient.getQueryData<Service[]>(servicesKeys.lists()) || []).find(s => s.id === data.id);

      if (previousService && previousService.status !== variables.status) {
        createServiceEvent(data.id, {
          timestamp: new Date().toISOString(),
          type: variables.status.toLowerCase() as any,
          message: `Service status changed to ${variables.status}`,
        });
      }
    },
    onError: (err, updatedService, context) => {
      toast.error(`Failed to update service: ${err.message}`);
      if (context?.previousServices) {
        queryClient.setQueryData(
          servicesKeys.lists(),
          context.previousServices
        );
      }
      if (context?.previousServiceDetail) {
        queryClient.setQueryData(
          servicesKeys.detail(updatedService.id),
          context.previousServiceDetail
        );
      }
    },
  });
};
