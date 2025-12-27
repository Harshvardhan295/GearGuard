import api from '@/lib/api';
import { Employee } from '@/types';

export const employeeService = {
  async getAll(): Promise<Employee[]> {
    const response = await api.get<Employee[]>('/employees');
    return response.data;
  },

  async getById(id: string): Promise<Employee> {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response.data;
  },

  async create(data: Omit<Employee, 'id'>): Promise<Employee> {
    const response = await api.post<Employee>('/employees', data);
    return response.data;
  },

  async update(id: string, data: Partial<Employee>): Promise<Employee> {
    const response = await api.put<Employee>(`/employees/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/employees/${id}`);
  },

  async getByDepartment(departmentId: string): Promise<Employee[]> {
    const response = await api.get<Employee[]>(`/employees?departmentId=${departmentId}`);
    return response.data;
  },
};

export default employeeService;
