import { Inject, Injectable } from '@nestjs/common';
import { User } from './domain/user';
import {
  USER_REPOSITORY,
  UserRepository,
} from './domain/user.repository.interface';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = await User.create(input);
    const savedUser = await this.userRepository.save(user);
    return {
      code: savedUser.code,
      nickname: savedUser.nickname,
      email: savedUser.email,
    };
  }
}
