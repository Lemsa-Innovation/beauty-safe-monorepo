import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listSubSubCategories,
  getSubSubCategoryById,
  createSubSubCategory,
  updateSubSubCategory,
  deleteSubSubCategory,
  searchSubSubCategories,
} from '../services/subsubcategory.service';
import type { SubSubCategory } from '../lib/entities';

export function useSubSubCategories() {
  return useQuery({ queryKey: ['subsubcategories'], queryFn: listSubSubCategories });
}

export function useSubSubCategoryById(id: number | string) {
  return useQuery({ queryKey: ['subsubcategory', id], queryFn: () => getSubSubCategoryById(id), enabled: !!id });
}

export function useCreateSubSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SubSubCategory>) => createSubSubCategory(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subsubcategories'] }),
  });
}

export function useUpdateSubSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<SubSubCategory> }) => updateSubSubCategory(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subsubcategories'] }),
  });
}

export function useDeleteSubSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteSubSubCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subsubcategories'] }),
  });
}

export function useSearchSubSubCategories(q: string) {
  return useQuery({
    queryKey: ['subsubcategoriesSearch', q],
    queryFn: () => searchSubSubCategories(q),
    enabled: !!q,
  });
}
