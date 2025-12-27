import api from '@/lib/api';
import { WorkflowAction, MaintenanceRequest } from '@/types';

export const workflowService = {
  async processAction(action: WorkflowAction): Promise<MaintenanceRequest> {
    const response = await api.post<MaintenanceRequest>('/workflow/action', action);
    return response.data;
  },

  async approve(requestId: string, notes?: string): Promise<MaintenanceRequest> {
    return this.processAction({ requestId, action: 'approve', notes });
  },

  async reject(requestId: string, notes?: string): Promise<MaintenanceRequest> {
    return this.processAction({ requestId, action: 'reject', notes });
  },

  async assign(requestId: string, assignedTo: string, notes?: string): Promise<MaintenanceRequest> {
    return this.processAction({ requestId, action: 'assign', assignedTo, notes });
  },

  async complete(requestId: string, notes?: string): Promise<MaintenanceRequest> {
    return this.processAction({ requestId, action: 'complete', notes });
  },

  async getPendingApprovals(): Promise<MaintenanceRequest[]> {
    const response = await api.get<MaintenanceRequest[]>('/workflow/pending');
    return response.data;
  },
};

export default workflowService;
