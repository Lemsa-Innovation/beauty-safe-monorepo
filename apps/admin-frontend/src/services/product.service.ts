import { api } from '../lib/api/api-client';
import type { Product } from '../lib/entities/product.entity';

// Create product
export const createProduct = (data: Partial<Product>) =>
  api.post<Product, Partial<Product>>('/products', data);

// List all products
export const listProducts = () =>
  api.get<Product[]>('/products');

// Get product by ID
export const getProductById = (id: number | string) =>
  api.get<Product>(`/products/${id}`);

// Update product
export const updateProduct = (id: number | string, data: Partial<Product>) =>
  api.patch<Product, Partial<Product>>(`/products/${id}`, data);

// Delete product
export const deleteProduct = (id: number | string) =>
  api.delete<void>(`/products/${id}`);

// Get product by EAN
export const getProductByEan = (ean: string) =>
  api.get<Product>(`/products/ean/${ean}`);

// Get products by Category
export const getProductsByCategory = (categoryId: number | string) =>
  api.get<Product[]>(`/products/category/${categoryId}`);

// Get products by SubCategory
export const getProductsBySubCategory = (subCategoryId: number | string) =>
  api.get<Product[]>(`/products/subcategory/${subCategoryId}`);

// Get products by SubSubCategory
export const getProductsBySubSubCategory = (subSubCategoryId: number | string) =>
  api.get<Product[]>(`/products/subsubcategory/${subSubCategoryId}`);

// Get products by Flag
export const getProductsByFlag = (flagId: number | string) =>
  api.get<Product[]>(`/products/flag/${flagId}`);
