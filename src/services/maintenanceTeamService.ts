import api from '@/lib/api';
import { Team } from '@/types';

export const maintenanceTeamService = {
  async getAll(): Promise<Team[]> {
    const response = await api.get<Team[]>('/maintenance-teams');
    return response.data;
  },

  async getById(id: string): Promise<Team> {
    const response = await api.get<Team>(`/maintenance-teams/${id}`);
    return response.data;
  },

  async create(data: Omit<Team, 'id'>): Promise<Team> {
    const response = await api.post<Team>('/maintenance-teams', data);
    return response.data;
  },

  async update(id: string, data: Partial<Team>): Promise<Team> {
    const response = await api.put<Team>(`/maintenance-teams/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/maintenance-teams/${id}`);
  },

  async addMember(teamId: string, memberId: string): Promise<Team> {
    const response = await api.post<Team>(`/maintenance-teams/${teamId}/members`, { memberId });
    return response.data;
  },

  async removeMember(teamId: string, memberId: string): Promise<Team> {
    const response = await api.delete<Team>(`/maintenance-teams/${teamId}/members/${memberId}`);
    return response.data;
  },
};

export default maintenanceTeamService;
