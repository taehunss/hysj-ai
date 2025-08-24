import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum HoroscopeType {
  SOLAR = 'solar',
  LUNAR = 'lunar',
}

export class HoroscopeInput {
  @IsNumber()
  @ApiProperty({
    description: '년',
    example: '1996',
  })
  year: number;

  @IsNumber()
  @ApiProperty({
    description: '월',
    example: '12',
  })
  month: number;

  @IsNumber()
  @ApiProperty({
    description: '일',
    example: '15',
  })
  day: number;

  @IsNumber()
  @ApiProperty({
    description: '시',
    example: '4',
  })
  hour: number;

  @IsNumber()
  @ApiProperty({
    description: '분',
    example: '0',
  })
  minute: number;

  @IsEnum(Gender)
  @ApiProperty({
    description: '성별',
    example: '남',
  })
  gender: Gender;

  @IsEnum(HoroscopeType)
  @ApiProperty({
    description: '타입',
    example: 'solar',
  })
  type: HoroscopeType;
}
