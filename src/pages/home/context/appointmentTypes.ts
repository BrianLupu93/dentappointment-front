export type Service = {
  id: string;
  name: string;
  duration: number;
};

export type CreateService = Omit<Service, "id">;

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

export interface AppointmentState {
  personalInfo: PersonalInfo;
  service: Service | null;
  date: string | null; //format DD-MM-YYY
  startTime: string | null; // format 08:30
}

export type AppointmentActions =
  | { type: "SET_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "SET_SERVICE"; payload: Service }
  | { type: "SET_DATE"; payload: string } // format dd-mm-yyy
  | { type: "SET_START_TIME"; payload: string } // format 08:00
  | { type: "RESET_APPOINTMENT" };
