import { UserAuth } from 'src/common/auth/interface/user-auth.interface';
import { DeleteResult } from 'typeorm';
import { Person } from '../person';

export interface PersonRepository {
  save(person: Person): Promise<Person>;
  findByUser(userAuth: UserAuth): Promise<Person[]>;
  findOne(code: string): Promise<Person>;
  update(person: Person): Promise<Person>;
  delete(person: Person): Promise<DeleteResult>;
}

export const PERSON_REPOSITORY = Symbol('PERSON_REPOSITORY');
