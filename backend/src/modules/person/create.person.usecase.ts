import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from 'src/common/auth/interface/user-auth.interface';
import { LOGGER, Logger } from 'src/common/logger/logger.interface';
import { PersonEntity } from 'src/infrastructure/database/entity/person.entity';
import { UserEntity } from 'src/infrastructure/database/entity/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreatePersonDto } from './dto/create.person.dto';
import { PersonDto } from './dto/person.dto';

@Injectable()
export class CreatePersonUsecase {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(LOGGER)
    private readonly logger: Logger,
  ) {}
  async execute(
    userAuth: UserAuth,
    input: CreatePersonDto,
  ): Promise<PersonDto> {
    const user = await this.userRepository.findOne({
      where: {
        code: userAuth.code,
      },
    });
    const person = this.personRepository.create(input);
    person.code = uuidv4();
    person.user = user;
    await this.personRepository.save(person);
    return person;
  }
}
