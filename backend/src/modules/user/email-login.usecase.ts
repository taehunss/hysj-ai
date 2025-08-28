import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './domain/user';
import { UserRepository } from './domain/user.repository.interface';

@Injectable()
export class EmailLoginUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user.validatePassword(password)) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}
