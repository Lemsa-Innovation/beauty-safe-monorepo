import type { Family } from '../lib/entities';
import { api } from '../lib/api/api-client';

export async function listFamilies(): Promise<Family[]> {
  return api.get('/families');
}

export async function getFamilyById(id: number | string): Promise<Family> {
  return api.get(`/families/${id}`);
}

export async function createFamily(data: Partial<Family>): Promise<Family> {
  return api.post('/families', data);
}

export async function updateFamily(id: number | string, data: Partial<Family>): Promise<Family> {
  return api.patch(`/families/${id}`, data);
}

export async function deleteFamily(id: number | string): Promise<void> {
  return api.delete(`/families/${id}`);
}

export async function searchFamilies(q: string): Promise<Family[]> {
  return api.get(`/families/search?q=${encodeURIComponent(q)}`);
}
