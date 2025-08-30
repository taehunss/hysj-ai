import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlingModule } from 'src/infrastructure/crawling/crawling.module';
import { PersonEntity } from 'src/infrastructure/database/entity/person.entity';
import { UserEntity } from 'src/infrastructure/database/entity/user.entity';
import { LLMModelModule } from 'src/infrastructure/llm-model/llm-model.module';
import { CreatePersonUsecase } from './create.person.usecase';
import { PERSON_REPOSITORY } from './domain/repository/person.repository';
import { PersonRepositoryImpl } from './infrastructure/person.repository.impl';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports: [
    CrawlingModule,
    LLMModelModule,
    TypeOrmModule.forFeature([PersonEntity, UserEntity]),
  ],
  controllers: [PersonController],
  providers: [
    CreatePersonUsecase,
    PersonService,
    {
      provide: PERSON_REPOSITORY,
      useClass: PersonRepositoryImpl,
    },
  ],
})
export class PersonModule {}
