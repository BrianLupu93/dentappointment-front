export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
}

export interface ClientInfo {
  fullName: string;
  email: string;
  phone: string;
}

export type StartTime = string; // format 08-00
export type FormattedDate = string; // format 10-05-2026

export interface Appointment {
  clientInfo: ClientInfo;
  service: Service;
  date: FormattedDate;
  startTime: StartTime;
}

export interface AppointmentState {
  services: Service[];
  selectedService: Service | null;
  availableSlots: StartTime[];
  selectedSlot: StartTime | null;
  clientInfo: ClientInfo;
  currentDate: Date;
  selectedDay: FormattedDate;
}
