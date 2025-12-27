// User and Role Types
export type AppRole = 'admin' | 'technician' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: AppRole;
}

// Maintenance Types
export type MaintenanceStatus = 'new' | 'in_progress' | 'repaired' | 'scrap';
export type MaintenanceType = 'corrective' | 'preventive';
export type Priority = 0 | 1 | 2 | 3;

export interface MaintenanceRequest {
  id: string;
  subject: string;
  createdBy: string;
  maintenanceType: MaintenanceType;
  equipmentId?: string;
  workCenterId?: string;
  teamId: string;
  technicianId: string;
  scheduledDate: Date;
  duration: number; // in hours
  priority: Priority;
  status: MaintenanceStatus;
  notes?: string;
  instructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Equipment Types
export interface Equipment {
  id: string;
  name: string;
  categoryId: string;
  serialNumber?: string;
  employeeId?: string;
  departmentId?: string;
  technicianId?: string;
  maintenanceTeamId?: string;
  assignedDate?: Date;
  scrapDate?: Date;
  location?: string;
  workCenterId?: string;
  description?: string;
}

export interface EquipmentCategory {
  id: string;
  name: string;
  responsibleId?: string;
}

// Work Center Types
export interface WorkCenter {
  id: string;
  name: string;
  code: string;
  tag?: string;
  alternativeWorkCenters?: string[];
  costPerHour: number;
  capacityEfficiency: number;
  oeeTarget: number;
}

// Team Types
export interface Team {
  id: string;
  name: string;
  memberIds: string[];
}

// Dashboard Types
export interface KPIData {
  totalRequests: number;
  totalRequestsChange: number;
  inProgress: number;
  inProgressPercentage: number;
  completed: number;
  completedTrend: 'up' | 'down' | 'stable';
}
