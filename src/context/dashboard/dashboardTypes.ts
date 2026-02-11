export interface Service {
  _id: string;
  name: string;
  duration: number; // minutes
  active: boolean;
}

export interface ClientInfo {
  fullName: string;
  email: string;
  phone: string;
}

export type StartTime = string; // format 08:00
export type EndTime = string; // format 10:00
export type FormattedDate = string; // format 10-05-2026

export interface Appointment {
  clientInfo: ClientInfo;
  service: Service;
  date: FormattedDate;
  startTime: StartTime;
  endTime: EndTime;
}

export interface DashboardState {
  currentDate: Date;
  selectedDay: FormattedDate;
  appointments: Appointment[];
}
