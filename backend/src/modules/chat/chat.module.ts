import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from 'src/infrastructure/database/entity/person.entity';
import { LLMModelModule } from 'src/infrastructure/llm-model/llm-model.module';
import { WebSocketModule } from 'src/infrastructure/web-socket/web-socket.module';
import { ChatHandler } from './chat.handler';

@Module({
  imports: [
    WebSocketModule,
    LLMModelModule,
    TypeOrmModule.forFeature([PersonEntity]),
  ],
  providers: [ChatHandler],
  exports: [ChatHandler],
})
export class ChatModule {}
