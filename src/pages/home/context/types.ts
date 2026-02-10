export interface Service {
  _id: string;
  name: string;
  duration: number; // minutes
}

export interface ClientInfo {
  fullName: string;
  email: string;
  phone: string;
}

export type StartTime = string; // format 08:00
export type FormattedDate = string; // format 10-05-2026

export interface Appointment {
  clientInfo: ClientInfo;
  service: Service;
  date: FormattedDate;
  startTime: StartTime;
}

export interface AvailableCalendarDay {
  date: string;
  full: boolean;
}

export interface AppointmentState {
  services: Service[];
  selectedService: Service | null;
  availableSlots: StartTime[];
  selectedStartTime: StartTime | null;
  currentDate: Date;
  selectedDay: FormattedDate;
  calendarAvailability: AvailableCalendarDay[];
  error?: string;
  loading: boolean;
}
