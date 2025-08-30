import { PartialType } from '@nestjs/swagger';
import { PersonDto } from './person.dto';

export class UpdatePersonDto extends PartialType(PersonDto) {}
