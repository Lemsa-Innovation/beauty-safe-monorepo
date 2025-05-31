import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  searchSubCategories,
} from '../services/subcategory.service';
import type { SubCategory } from '../lib/entities';

export function useSubCategories() {
  return useQuery({ queryKey: ['subcategories'], queryFn: listSubCategories });
}

export function useSubCategoryById(id: number | string) {
  return useQuery({ queryKey: ['subcategory', id], queryFn: () => getSubCategoryById(id), enabled: !!id });
}

export function useCreateSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SubCategory>) => createSubCategory(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subcategories'] }),
  });
}

export function useUpdateSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<SubCategory> }) => updateSubCategory(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subcategories'] }),
  });
}

export function useDeleteSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteSubCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subcategories'] }),
  });
}

export function useSearchSubCategories(q: string) {
  return useQuery({
    queryKey: ['subcategoriesSearch', q],
    queryFn: () => searchSubCategories(q),
    enabled: !!q,
  });
}
