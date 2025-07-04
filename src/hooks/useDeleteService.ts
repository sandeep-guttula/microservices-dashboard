import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteService } from "@/lib/queries/services";
import { servicesKeys } from "../lib/queries/services";
import { Service } from "@/types/types";

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,
    onMutate: async (serviceId) => {
      await queryClient.cancelQueries({ queryKey: servicesKeys.lists() });

      const previousServices = queryClient.getQueryData(servicesKeys.lists());

      queryClient.setQueryData(
        servicesKeys.lists(),
        (old: Service[] | undefined) =>
          old?.filter((service) => service.id !== serviceId)
      );

      return { previousServices };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
      toast.success("Service deleted successfully.");
    },
    onError: (err, serviceId, context) => {
      toast.error(`Failed to delete service: ${err.message}`);
      if (context?.previousServices) {
        queryClient.setQueryData(
          servicesKeys.lists(),
          context.previousServices
        );
      }
    },
  });
};
