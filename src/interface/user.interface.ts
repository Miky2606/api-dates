export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  datesWork: DatesWork[];
  vacations: Vacations[];
  locationsWork: string[];
  typeWork: string[];
  appointments: Appointments[];
}

export interface IUserClient {
  id: string;
  name: string;
  email: string;
  appointments: Appointments[];
  location: string;
  typeSign: string;
}

export interface DatesWork {
  date: string;
  timeBegin: string;
  timeEnd: string;
}

export interface Vacations {
  dateBegin: string;
  dateEnd: string;
}

export interface Appointments {
  id: string;
  date: string;
  time: string;
  user: string;
  appointmentLocation: string;
}
