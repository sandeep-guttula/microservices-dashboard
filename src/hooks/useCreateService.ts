import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Service } from "@/types/types";
import { createService } from "@/lib/queries/services";
import { servicesKeys } from "../lib/queries/services";

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createService,
    onMutate: async (newService) => {
      await queryClient.cancelQueries({ queryKey: servicesKeys.lists() });

      const previousServices = queryClient.getQueryData(servicesKeys.lists());

      queryClient.setQueryData(
        servicesKeys.lists(),
        (old: Service[] | undefined) => {
          const tempId = `temp-${Date.now()}`;
          return [
            ...(old || []),
            { ...newService, id: tempId, status: "Online", lastCheck: "Now" },
          ];
        }
      );

      return { previousServices };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
      toast.success("Service created successfully.");
    },
    onError: (err, newService, context) => {
      toast.error(`Failed to create service: ${err.message}`);
      if (context?.previousServices) {
        queryClient.setQueryData(
          servicesKeys.lists(),
          context.previousServices
        );
      }
    },
  });
};
