import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailLoginInput {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password' })
  password: string;
}

export class EmailLoginOutput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'accessToken' })
  accessToken: string;
}
