import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { EmailSignInUsecase } from './email.sign-in.usecase';
import { EmailSignUpUsecase } from './email.sign-up.usecase';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [EmailSignUpUsecase, EmailSignInUsecase, JwtService],
})
export class UserModule {}
