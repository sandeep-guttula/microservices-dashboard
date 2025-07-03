
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Service, ServiceEvent } from '@/types/types';

const fetchServices = async (): Promise<Service[]> => {
  const res = await fetch('/api/services');
  if (!res.ok) {
    throw new Error('Failed to fetch services');
  }
  return res.json();
};

const fetchServiceById = async (id: string): Promise<Service> => {
  const res = await fetch(`/api/services/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch service');
  }
  return res.json();
};

const fetchServiceEvents = async (id: string): Promise<ServiceEvent[]> => {
  const res = await fetch(`/api/services/${id}/events`);
  if (!res.ok) {
    throw new Error('Failed to fetch service events');
  }
  return res.json();
};

const createService = async (newService: Omit<Service, 'id'>): Promise<Service> => {
  const res = await fetch('/api/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newService),
  });
  if (!res.ok) {
    throw new Error('Failed to create service');
  }
  return res.json();
};

const updateService = async (updatedService: Partial<Service> & { id: string }): Promise<Service> => {
  const res = await fetch(`/api/services/${updatedService.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedService),
    }
  );
  if (!res.ok) {
    throw new Error('Failed to update service');
  }
  return res.json();
};

const deleteService = async (id: string): Promise<void> => {
  const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error('Failed to delete service');
  }
};

export const useGetServices = () => useQuery({ queryKey: ['services'], queryFn: fetchServices });
export const useGetServiceById = (id: string) => useQuery({ queryKey: ['service', id], queryFn: () => fetchServiceById(id) });
export const useGetServiceEvents = (id: string) => useQuery({ queryKey: ['serviceEvents', id], queryFn: () => fetchServiceEvents(id) });

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service', data.id] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};
