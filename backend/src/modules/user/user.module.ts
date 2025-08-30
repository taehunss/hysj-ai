import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { CreateUserUsecase } from './create.user.usecase';
import { EmailLoginUsecase } from './email-login.usecase';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUsecase, EmailLoginUsecase, JwtService],
})
export class UserModule {}
