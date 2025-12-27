// User and Role Types
export type AppRole = 'admin' | 'technician' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: AppRole;
  avatar?: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

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
  duration: number; 
  priority: Priority;
  status: MaintenanceStatus;
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Equipment {
  id: string;
  name: string;
  categoryId: string;
  serialNumber?: string;
  purchaseDate?: string;
  warrantyInfo?: string;
  maintenanceTeamId?: string;
  technicianId?: string;
  employeeId?: string;
  departmentId?: string;
  isScrapped?: boolean;
  location?: string;
}

export interface EquipmentCategory {
  id: string;
  name: string;
  responsibleId?: string;
}

// Department Types
export interface Department {
  id: string;
  name: string;
  code?: string;
  managerId?: string;
}

// Employee Types
export interface Employee {
  id: string;
  name: string;
  email: string;
  departmentId?: string;
  role?: string;
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

// Team Types (Maintenance Teams)
export interface Team {
  id: string;
  name: string;
  memberIds: string[];
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

// Calendar Event Types
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  maintenanceRequestId?: string;
  type: 'maintenance' | 'meeting' | 'other';
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

// Workflow Types
export interface WorkflowAction {
  requestId: string;
  action: 'approve' | 'reject' | 'assign' | 'complete';
  notes?: string;
  assignedTo?: string;
}
