import api from '@/lib/api';
import { Equipment, EquipmentCategory } from '@/types';

export const equipmentService = {
  // Equipment CRUD
  async getAll(): Promise<Equipment[]> {
    const response = await api.get<Equipment[]>('/equipment');
    return response.data;
  },

  async getById(id: string): Promise<Equipment> {
    const response = await api.get<Equipment>(`/equipment/${id}`);
    return response.data;
  },

  async create(data: Omit<Equipment, 'id'>): Promise<Equipment> {
    const response = await api.post<Equipment>('/equipment', data);
    return response.data;
  },

  async update(id: string, data: Partial<Equipment>): Promise<Equipment> {
    const response = await api.put<Equipment>(`/equipment/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/equipment/${id}`);
  },

  // Categories
  async getCategories(): Promise<EquipmentCategory[]> {
    const response = await api.get<EquipmentCategory[]>('/equipment/categories');
    return response.data;
  },

  async createCategory(data: Omit<EquipmentCategory, 'id'>): Promise<EquipmentCategory> {
    const response = await api.post<EquipmentCategory>('/equipment/categories', data);
    return response.data;
  },

  async updateCategory(id: string, data: Partial<EquipmentCategory>): Promise<EquipmentCategory> {
    const response = await api.put<EquipmentCategory>(`/equipment/categories/${id}`, data);
    return response.data;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/equipment/categories/${id}`);
  },
};

export default equipmentService;
