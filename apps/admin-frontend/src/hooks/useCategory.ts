import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategories,
} from '../services/category.service';
import type { Category } from '../lib/entities';

export function useCategories() {
  return useQuery({ queryKey: ['categories'], queryFn: listCategories });
}

export function useCategoryById(id: number | string) {
  return useQuery({ queryKey: ['category', id], queryFn: () => getCategoryById(id), enabled: !!id });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Category>) => createCategory(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<Category> }) => updateCategory(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useSearchCategories(q: string) {
  return useQuery({
    queryKey: ['categoriesSearch', q],
    queryFn: () => searchCategories(q),
    enabled: !!q,
  });
}
