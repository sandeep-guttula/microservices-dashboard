import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Service } from "@/types/types";
import { updateService } from "@/lib/api";
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

      const previousServices = queryClient.getQueryData(servicesKeys.lists());
      const previousServiceDetail = queryClient.getQueryData(
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: servicesKeys.detail(data.id) });
      toast.success("Service updated successfully.");
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
