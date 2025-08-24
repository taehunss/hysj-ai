import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../domain/user';

export class UserDto implements User {
  @IsNotEmpty()
  @ApiProperty({ example: '김태훈' })
  nickname: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
