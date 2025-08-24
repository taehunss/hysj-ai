import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUsecase } from './create.user.usecase';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @Post()
  async createUser(@Body() userDto: UserDto) {
    return this.createUserUsecase.execute(userDto);
  }
}
