import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listFlags,
  getFlagById,
  createFlag,
  updateFlag,
  deleteFlag,
  searchFlags,
} from '../services/flag.service';
import type { Flag } from '../lib/entities';

export function useFlags() {
  return useQuery({ queryKey: ['flags'], queryFn: listFlags });
}

export function useFlagById(id: number | string) {
  return useQuery({ queryKey: ['flag', id], queryFn: () => getFlagById(id), enabled: !!id });
}

export function useCreateFlag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Flag>) => createFlag(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['flags'] }),
  });
}

export function useUpdateFlag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<Flag> }) => updateFlag(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['flags'] }),
  });
}

export function useDeleteFlag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteFlag(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['flags'] }),
  });
}

export function useSearchFlags(q: string) {
  return useQuery({
    queryKey: ['flagsSearch', q],
    queryFn: () => searchFlags(q),
    enabled: !!q,
  });
}
