import type { SubCategory } from '../lib/entities';
import { api } from '../lib/api/api-client';

export async function listSubCategories(): Promise<SubCategory[]> {
  return api.get('/subcategories');
}

export async function getSubCategoryById(id: number | string): Promise<SubCategory> {
  return api.get(`/subcategories/${id}`);
}

export async function createSubCategory(data: Partial<SubCategory>): Promise<SubCategory> {
  return api.post('/subcategories', data);
}

export async function updateSubCategory(id: number | string, data: Partial<SubCategory>): Promise<SubCategory> {
  return api.patch(`/subcategories/${id}`, data);
}

export async function deleteSubCategory(id: number | string): Promise<void> {
  return api.delete(`/subcategories/${id}`);
}

export async function searchSubCategories(q: string): Promise<SubCategory[]> {
  return api.get(`/subcategories/search?q=${encodeURIComponent(q)}`);
}
