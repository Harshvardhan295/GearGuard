import api from '@/lib/api';
import { CalendarEvent } from '@/types';

export const calendarService = {
  async getEvents(start?: Date, end?: Date): Promise<CalendarEvent[]> {
    const params = new URLSearchParams();
    if (start) params.append('start', start.toISOString());
    if (end) params.append('end', end.toISOString());
    
    const response = await api.get<CalendarEvent[]>(`/calendar?${params.toString()}`);
    return response.data;
  },

  async getEventById(id: string): Promise<CalendarEvent> {
    const response = await api.get<CalendarEvent>(`/calendar/${id}`);
    return response.data;
  },

  async createEvent(data: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    const response = await api.post<CalendarEvent>('/calendar', data);
    return response.data;
  },

  async updateEvent(id: string, data: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const response = await api.put<CalendarEvent>(`/calendar/${id}`, data);
    return response.data;
  },

  async deleteEvent(id: string): Promise<void> {
    await api.delete(`/calendar/${id}`);
  },

  async getMaintenanceSchedule(): Promise<CalendarEvent[]> {
    const response = await api.get<CalendarEvent[]>('/calendar/maintenance');
    return response.data;
  },
};

export default calendarService;
