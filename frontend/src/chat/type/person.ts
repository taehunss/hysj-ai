export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum CalendarType {
  SOLAR = "solar",
  LUNAR = "lunar",
}

export interface Person {
  code: string;
  name: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour?: number;
  birthMinute?: number;
  gender: Gender;
  calendarType: CalendarType;
  isUnknownBirthTime: boolean;
}
