import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/auth/decorator/get-user.decorator';
import { UserAuth } from 'src/common/auth/interface/user-auth.interface';
import { CreatePersonUsecase } from './create.person.usecase';
import { CreatePersonDto } from './dto/create.person.dto';
import { PersonDto } from './dto/person.dto';
import { PersonService } from './person.service';

@ApiTags('persons')
@ApiBearerAuth()
@Controller('persons')
export class PersonController {
  constructor(
    private readonly createPersonalInfoUsecase: CreatePersonUsecase,
    private readonly personService: PersonService,
  ) {}

  @Post()
  async createPersonalInfo(
    @GetUser() userAuth: UserAuth,
    @Body() body: CreatePersonDto,
  ): Promise<PersonDto> {
    return this.createPersonalInfoUsecase.execute(userAuth, body);
  }

  @Get()
  async getPersonalInfo(@GetUser() userAuth: UserAuth): Promise<PersonDto[]> {
    return this.personService.findByUser(userAuth);
  }

  @Get(':code')
  async getPersonalInfoByCode(@Query('code') code: string): Promise<PersonDto> {
    return this.personService.findOne(code);
  }

  @Put(':code')
  async updatePersonalInfo(@Body() body: PersonDto): Promise<PersonDto> {
    return this.personService.update(body);
  }
}
