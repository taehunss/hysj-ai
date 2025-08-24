import { Module } from '@nestjs/common';
import { ChatGPTModel } from './chat-gpt.model';

@Module({
  providers: [ChatGPTModel],
  exports: [ChatGPTModel],
})
export class LLMModelModule {}
