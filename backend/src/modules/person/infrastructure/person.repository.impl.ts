import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from 'src/common/auth/interface/user-auth.interface';
import { PersonEntity } from 'src/infrastructure/database/entity/person.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Person } from '../domain/person';
import { PersonRepository } from '../domain/repository/person.repository';

@Injectable()
export class PersonRepositoryImpl implements PersonRepository {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}
  save(person: Person): Promise<Person> {
    return this.personRepository.save(person);
  }
  async findByUser(userAuth: UserAuth): Promise<Person[]> {
    return await this.personRepository.find({
      where: {
        user: {
          code: userAuth.code,
        },
      },
    });
  }
  findOne(code: string): Promise<Person> {
    return this.personRepository.findOne({ where: { code } });
  }
  async update(person: Person): Promise<Person> {
    await this.personRepository.update(person.code, person);
    return this.findOne(person.code);
  }
  async delete(person: Person): Promise<DeleteResult> {
    return await this.personRepository.delete(person.code);
  }
}
