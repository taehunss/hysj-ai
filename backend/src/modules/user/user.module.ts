import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/database/entity/user.entity';
import { CreateUserUsecase } from './create.user.usecase';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [CreateUserUsecase],
})
export class UserModule {}
