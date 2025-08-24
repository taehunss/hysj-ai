import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/database/entity/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dto/user.dto';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(input: UserDto) {
    const user = this.userRepository.create(input);
    user.code = uuidv4();
    await this.userRepository.save(user);
    return user;
  }
}
