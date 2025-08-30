import { Inject, Injectable } from '@nestjs/common';
import { UserAuth } from 'src/common/auth/interface/user-auth.interface';
import { DeleteResult } from 'typeorm';
import { Person } from './domain/person';
import {
  PERSON_REPOSITORY,
  PersonRepository,
} from './domain/repository/person.repository';

@Injectable()
export class PersonService {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: PersonRepository,
  ) {}

  async findByUser(userAuth: UserAuth): Promise<Person[]> {
    return this.personRepository.findByUser(userAuth);
  }

  async findOne(code: string): Promise<Person> {
    return this.personRepository.findOne(code);
  }

  async update(person: Person): Promise<Person> {
    return this.personRepository.update(person);
  }

  async delete(person: Person): Promise<DeleteResult> {
    return this.personRepository.delete(person);
  }
}
