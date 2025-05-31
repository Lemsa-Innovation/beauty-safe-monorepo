import type { Ingredient } from '../lib/entities';
import { api } from '../lib/api/api-client';

export async function listIngredients(): Promise<Ingredient[]> {
  return api.get('/ingredients');
}

export async function getIngredientById(id: number | string): Promise<Ingredient> {
  return api.get(`/ingredients/${id}`);
}

export async function createIngredient(data: Partial<Ingredient>): Promise<Ingredient> {
  return api.post('/ingredients', data);
}

export async function updateIngredient(id: number | string, data: Partial<Ingredient>): Promise<Ingredient> {
  return api.patch(`/ingredients/${id}`, data);
}

export async function deleteIngredient(id: number | string): Promise<void> {
  return api.delete(`/ingredients/${id}`);
}

export async function searchIngredients(q: string): Promise<Ingredient[]> {
  return api.get(`/ingredients/search?q=${encodeURIComponent(q)}`);
}
