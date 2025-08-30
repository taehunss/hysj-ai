import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../infrastructure/database/entity/user.entity';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user.repository.interface';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOneOrFail({
      where: { email },
    });

    return this.toDomain(userEntity);
  }

  async save(user: User): Promise<User> {
    const userEntity = this.toEntity(user);
    const savedEntity = await this.userRepository.save(userEntity);
    return this.toDomain(savedEntity);
  }

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { id },
    });

    if (!userEntity) {
      return null;
    }

    return this.toDomain(userEntity);
  }

  async update(user: User): Promise<User> {
    const userEntity = this.toEntity(user);
    const updatedEntity = await this.userRepository.save(userEntity);
    return this.toDomain(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // 매핑 메서드들
  private toDomain(userEntity: UserEntity): User {
    return new User({
      id: userEntity.id,
      code: userEntity.code,
      nickname: userEntity.nickname,
      email: userEntity.email,
      password: userEntity.password,
    });
  }

  private toEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.code = user.code;
    userEntity.nickname = user.nickname;
    userEntity.email = user.email;
    userEntity.password = user['password']; // private 필드 접근
    return userEntity;
  }
}
