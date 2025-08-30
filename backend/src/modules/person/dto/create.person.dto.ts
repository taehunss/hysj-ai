import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { CalendarType, Gender } from './person.dto';

export class CreatePersonDto {
  @IsNotEmpty()
  @ApiProperty({ example: '김태훈' })
  name: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  @ApiProperty({ example: 1996 })
  birthYear: number;

  @IsInt()
  @Min(1)
  @Max(12)
  @ApiProperty({ example: 12 })
  birthMonth: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(31)
  @ApiProperty({ example: 15, required: false, nullable: true })
  birthDay: number;

  @ValidateIf((o) => !o.isUnknownBirthTime)
  @IsInt()
  @Min(0)
  @Max(23)
  @ApiProperty({ example: 4, required: false, nullable: true })
  birthHour?: number;

  @ValidateIf((o) => !o.isUnknownBirthTime)
  @IsInt()
  @Min(0)
  @Max(59)
  @ApiProperty({ example: 0, required: false, nullable: true })
  birthMinute?: number;

  @IsEnum(Gender)
  @ApiProperty({ example: 'male', enum: Gender })
  gender: Gender;

  @IsEnum(CalendarType)
  @ApiProperty({ example: 'solar', enum: CalendarType })
  calendarType: CalendarType;

  @IsBoolean()
  @ApiProperty({ example: false })
  isUnknownBirthTime: boolean;
}
