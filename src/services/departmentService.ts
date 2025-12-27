import api from '@/lib/api';
import { Department } from '@/types';

export const departmentService = {
  async getAll(): Promise<Department[]> {
    const response = await api.get<Department[]>('/departments');
    return response.data;
  },

  async getById(id: string): Promise<Department> {
    const response = await api.get<Department>(`/departments/${id}`);
    return response.data;
  },

  async create(data: Omit<Department, 'id'>): Promise<Department> {
    const response = await api.post<Department>('/departments', data);
    return response.data;
  },

  async update(id: string, data: Partial<Department>): Promise<Department> {
    const response = await api.put<Department>(`/departments/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/departments/${id}`);
  },
};

export default departmentService;
