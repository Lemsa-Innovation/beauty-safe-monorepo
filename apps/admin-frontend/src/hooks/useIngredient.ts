import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  searchIngredients,
} from '../services/ingredient.service';
import type { Ingredient } from '../lib/entities';

export function useIngreddients(page: number, limit: number = 20) {
  return useQuery({ 
    queryKey: ['ingredients', page, limit], 
    queryFn: () => listIngredients(page, limit),
  });
}

export function useIngredientById(id: number | string) {
  return useQuery({ queryKey: ['ingredient', id], queryFn: () => getIngredientById(id), enabled: !!id });
}

export function useCreateIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Ingredient>) => createIngredient(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients'] }),
  });
}

export function useUpdateIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<Ingredient> }) => updateIngredient(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients'] }),
  });
}

export function useDeleteIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteIngredient(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients'] }),
  });
}

export function useSearchIngredients(q: string) {
  return useQuery({
    queryKey: ['ingredientsSearch', q],
    queryFn: () => searchIngredients(q),
    enabled: !!q,
  });
}
