import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUsecase } from './create.user.usecase';
import { CreateUserInput } from './dto/create-user.dto';
import { EmailLoginInput } from './dto/email-login.dto';
import { EmailLoginUsecase } from './email-login.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly emailLoginUsecase: EmailLoginUsecase,
  ) {}

  @Post('create')
  async createUser(@Body() userDto: CreateUserInput) {
    return this.createUserUsecase.execute(userDto);
  }

  @Post('email-login')
  async emailLogin(@Body() emailDto: EmailLoginInput) {
    return this.emailLoginUsecase.execute(emailDto);
  }
}
