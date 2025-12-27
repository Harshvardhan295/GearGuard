import { 
  Equipment, 
  EquipmentCategory, 
  MaintenanceRequest, 
  Team, 
  WorkCenter,
  User,
  KPIData
} from '@/types';

export const mockUsers: User[] = [
  { id: '1', email: 'admin@gearguard.com', name: 'Mitchell Admin', role: 'admin' },
  { id: '2', email: 'tech@gearguard.com', name: 'John Technician', role: 'technician' },
  { id: '3', email: 'user@gearguard.com', name: 'Abigail Peterson', role: 'user' },
];

export const mockCategories: EquipmentCategory[] = [
  { id: '1', name: 'Computers', responsibleId: '1' },
  { id: '2', name: 'Monitors', responsibleId: '1' },
  { id: '3', name: 'Software', responsibleId: '2' },
  { id: '4', name: 'Printers', responsibleId: '2' },
];

export const mockEquipment: Equipment[] = [
  { id: '1', name: 'Acer Laptop', categoryId: '1', serialNumber: 'ACR-2024-001', employeeId: '3', technicianId: '2' },
  { id: '2', name: 'Samsung Monitor 24"', categoryId: '2', serialNumber: 'SAM-2024-001', employeeId: '3', technicianId: '2' },
  { id: '3', name: 'HP Printer LaserJet', categoryId: '4', serialNumber: 'HP-2024-001', departmentId: 'IT', technicianId: '2' },
  { id: '4', name: 'Dell Desktop', categoryId: '1', serialNumber: 'DELL-2024-001', employeeId: '1', technicianId: '2' },
];

export const mockWorkCenters: WorkCenter[] = [
  { id: '1', name: 'Assembly 1', code: 'ASM1', tag: 'production', costPerHour: 100, capacityEfficiency: 100, oeeTarget: 90 },
  { id: '2', name: 'Drill 1', code: 'DRL1', tag: 'production', costPerHour: 75, capacityEfficiency: 95, oeeTarget: 85 },
  { id: '3', name: 'Quality Control', code: 'QC1', tag: 'quality', costPerHour: 50, capacityEfficiency: 100, oeeTarget: 95 },
];

export const mockTeams: Team[] = [
  { id: '1', name: 'Internal Maintenance', memberIds: ['1', '2'] },
  { id: '2', name: 'External Contractors', memberIds: ['2'] },
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    subject: 'Laptop Screen Replacement',
    createdBy: '1',
    maintenanceType: 'corrective',
    equipmentId: '1',
    teamId: '1',
    technicianId: '2',
    scheduledDate: new Date('2024-12-29T14:00:00'),
    duration: 2,
    priority: 2,
    status: 'in_progress',
    notes: 'Screen has dead pixels',
    createdAt: new Date('2024-12-27'),
    updatedAt: new Date('2024-12-27'),
  },
  {
    id: '2',
    subject: 'Monthly Printer Maintenance',
    createdBy: '1',
    maintenanceType: 'preventive',
    equipmentId: '3',
    teamId: '1',
    technicianId: '2',
    scheduledDate: new Date('2024-12-30T10:00:00'),
    duration: 1,
    priority: 1,
    status: 'new',
    createdAt: new Date('2024-12-26'),
    updatedAt: new Date('2024-12-26'),
  },
  {
    id: '3',
    subject: 'Desktop RAM Upgrade',
    createdBy: '3',
    maintenanceType: 'corrective',
    equipmentId: '4',
    teamId: '1',
    technicianId: '2',
    scheduledDate: new Date('2024-12-28T09:00:00'),
    duration: 1,
    priority: 3,
    status: 'repaired',
    createdAt: new Date('2024-12-25'),
    updatedAt: new Date('2024-12-28'),
  },
];

export const mockKPIData: KPIData = {
  totalRequests: 10,
  totalRequestsChange: 20,
  inProgress: 5,
  inProgressPercentage: 50,
  completed: 15,
  completedTrend: 'up',
};

export const mockChartData = [
  { month: 'Jan', corrective: 12, preventive: 8 },
  { month: 'Feb', corrective: 15, preventive: 10 },
  { month: 'Mar', corrective: 8, preventive: 12 },
  { month: 'Apr', corrective: 10, preventive: 14 },
  { month: 'May', corrective: 7, preventive: 16 },
  { month: 'Jun', corrective: 9, preventive: 15 },
];
