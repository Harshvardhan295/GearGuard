import api from '@/lib/api';
import { MaintenanceRequest } from '@/types';

export const maintenanceService = {
  async getAll(): Promise<MaintenanceRequest[]> {
    const response = await api.get<MaintenanceRequest[]>('/maintenance-requests');
    return response.data;
  },

  async getById(id: string): Promise<MaintenanceRequest> {
    const response = await api.get<MaintenanceRequest>(`/maintenance-requests/${id}`);
    return response.data;
  },

  async create(data: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<MaintenanceRequest> {
    const response = await api.post<MaintenanceRequest>('/maintenance-requests', data);
    return response.data;
  },

  async update(id: string, data: Partial<MaintenanceRequest>): Promise<MaintenanceRequest> {
    const response = await api.put<MaintenanceRequest>(`/maintenance-requests/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/maintenance-requests/${id}`);
  },

  async getByStatus(status: string): Promise<MaintenanceRequest[]> {
    const response = await api.get<MaintenanceRequest[]>(`/maintenance-requests?status=${status}`);
    return response.data;
  },

  async getByEquipment(equipmentId: string): Promise<MaintenanceRequest[]> {
    const response = await api.get<MaintenanceRequest[]>(`/maintenance-requests?equipmentId=${equipmentId}`);
    return response.data;
  },
};

export default maintenanceService;
