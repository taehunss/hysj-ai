import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/database/entity/user.entity';
import { UserRepositoryImpl } from 'src/infrastructure/database/repository/user.repository.impl';
import { CreateUserUsecase } from './create.user.usecase';
import { USER_REPOSITORY } from './domain/user.repository.interface';
import { EmailLoginUsecase } from './email-login.usecase';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    CreateUserUsecase,
    EmailLoginUsecase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}
