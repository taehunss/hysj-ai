import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlingModule } from 'src/infrastructure/crawling/crawling.module';
import { PersonEntity } from 'src/infrastructure/database/entity/person.entity';
import { UserEntity } from 'src/infrastructure/database/entity/user.entity';
import { LLMModelModule } from 'src/infrastructure/llm-model/llm-model.module';
import { CreatePersonUsecase } from './create.person.usecase';
import { PersonController } from './person.controller';

@Module({
  imports: [
    CrawlingModule,
    LLMModelModule,
    TypeOrmModule.forFeature([PersonEntity, UserEntity]),
  ],
  controllers: [PersonController],
  providers: [CreatePersonUsecase],
})
export class PersonModule {}
