import { CalendarType, Gender } from '../dto/person.dto';

export abstract class Person {
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
