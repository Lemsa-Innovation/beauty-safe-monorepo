import type { SubSubCategory } from '../lib/entities';
import { api } from '../lib/api/api-client';

export async function listSubSubCategories(): Promise<SubSubCategory[]> {
  return api.get('/subsubcategories');
}

export async function getSubSubCategoryById(id: number | string): Promise<SubSubCategory> {
  return api.get(`/subsubcategories/${id}`);
}

export async function createSubSubCategory(data: Partial<SubSubCategory>): Promise<SubSubCategory> {
  return api.post('/subsubcategories', data);
}

export async function updateSubSubCategory(id: number | string, data: Partial<SubSubCategory>): Promise<SubSubCategory> {
  return api.patch(`/subsubcategories/${id}`, data);
}

export async function deleteSubSubCategory(id: number | string): Promise<void> {
  return api.delete(`/subsubcategories/${id}`);
}

export async function searchSubSubCategories(q: string): Promise<SubSubCategory[]> {
  return api.get(`/subsubcategories/search?q=${encodeURIComponent(q)}`);
}
