import { Inject, Injectable } from '@nestjs/common';
import { User } from './domain/user';
import {
  USER_REPOSITORY,
  UserRepository,
} from './domain/user.repository.interface';
import { EmailSignUpInput, EmailSignUpOutput } from './dto/email.sign-up.dto';

@Injectable()
export class EmailSignUpUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: EmailSignUpInput): Promise<EmailSignUpOutput> {
    const user = await User.create(input);
    const savedUser = await this.userRepository.save(user);
    return {
      code: savedUser.code,
      nickname: savedUser.nickname,
      email: savedUser.email,
    };
  }
}
