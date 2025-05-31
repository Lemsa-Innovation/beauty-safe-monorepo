import type { Category } from '../lib/entities';
import { api } from '../lib/api/api-client';

export async function listCategories(): Promise<Category[]> {
  return api.get('/categories');
}

export async function getCategoryById(id: number | string): Promise<Category> {
  return api.get(`/categories/${id}`);
}

export async function createCategory(data: Partial<Category>): Promise<Category> {
  return api.post('/categories', data);
}

export async function updateCategory(id: number | string, data: Partial<Category>): Promise<Category> {
  return api.patch(`/categories/${id}`, data);
}

export async function deleteCategory(id: number | string): Promise<void> {
  return api.delete(`/categories/${id}`);
}

export async function searchCategories(q: string): Promise<Category[]> {
  return api.get(`/categories/search?q=${encodeURIComponent(q)}`);
}
