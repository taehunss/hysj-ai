import { Module } from '@nestjs/common';
import { LLMModelModule } from 'src/infrastructure/llm-model/llm-model.module';
import { WebSocketModule } from 'src/infrastructure/web-socket/web-socket.module';
import { ChatHandler } from './chat.handler';

@Module({
  imports: [WebSocketModule, LLMModelModule],
  providers: [ChatHandler],
  exports: [ChatHandler],
})
export class ChatModule {}
