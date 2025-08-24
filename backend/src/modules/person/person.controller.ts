import { Body, Controller, Post } from '@nestjs/common';
import { CreatePersonUsecase } from './create.person.usecase';
import { PersonDto } from './dto/person.dto';

@Controller('person')
export class PersonController {
  constructor(
    private readonly createPersonalInfoUsecase: CreatePersonUsecase,
  ) {}

  @Post()
  async createPersonalInfo(@Body() body: PersonDto) {
    return this.createPersonalInfoUsecase.execute(body);
  }
}
