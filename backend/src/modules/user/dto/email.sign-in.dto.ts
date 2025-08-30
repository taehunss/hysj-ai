import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailSignInInput {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password' })
  password: string;
}

export class EmailSignInOutput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'accessToken' })
  accessToken: string;
}
