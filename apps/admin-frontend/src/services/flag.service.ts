import type { Flag } from '../lib/entities';
import { api } from '../lib/api/api-client';

export async function listFlags(): Promise<Flag[]> {
  return api.get('/flags');
}

export async function getFlagById(id: number | string): Promise<Flag> {
  return api.get(`/flags/${id}`);
}

export async function createFlag(data: Partial<Flag>): Promise<Flag> {
  return api.post('/flags', data);
}

export async function updateFlag(id: number | string, data: Partial<Flag>): Promise<Flag> {
  return api.patch(`/flags/${id}`, data);
}

export async function deleteFlag(id: number | string): Promise<void> {
  return api.delete(`/flags/${id}`);
}

export async function searchFlags(q: string): Promise<Flag[]> {
  return api.get(`/flags/search?q=${encodeURIComponent(q)}`);
}
