import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listFamilies,
  getFamilyById,
  createFamily,
  updateFamily,
  deleteFamily,
  searchFamilies,
} from '../services/family.service';
import type { Family } from '../lib/entities';

export function useFamilies() {
  return useQuery({ queryKey: ['families'], queryFn: listFamilies });
}

export function useFamilyById(id: number | string) {
  return useQuery({ queryKey: ['family', id], queryFn: () => getFamilyById(id), enabled: !!id });
}

export function useCreateFamily() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Family>) => createFamily(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['families'] }),
  });
}

export function useUpdateFamily() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<Family> }) => updateFamily(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['families'] }),
  });
}

export function useDeleteFamily() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteFamily(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['families'] }),
  });
}

export function useSearchFamilies(q: string) {
  return useQuery({
    queryKey: ['familiesSearch', q],
    queryFn: () => searchFamilies(q),
    enabled: !!q,
  });
}
