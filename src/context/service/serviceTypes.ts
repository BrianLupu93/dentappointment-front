export interface ServiceAdmin {
  _id: string;
  name: string;
  duration: number; // minutes
  active: boolean;
}

export interface ServiceClient {
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
export type EndTime = string; // format 10:00
export type FormattedDate = string; // format 10-05-2026

export interface Appointment {
  clientInfo: ClientInfo;
  service: ServiceClient;
  date: FormattedDate;
  startTime: StartTime;
  endTime: EndTime;
}

export interface ServiceState {
  services: ServiceAdmin[];
  selectedService: ServiceAdmin | null;
  currentDate: Date;
  selectedDay: FormattedDate;
}
