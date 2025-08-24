import { Injectable } from '@nestjs/common';
import * as openai from 'openai';
import type { ResponseStreamEvent } from 'openai/resources/responses/responses';
import { EnvConfigService } from '../env-config/env-config.service';
import { TSLogger } from '../logger/logger';

export type ChatGPTResponseStream = any;
export interface ChatGPTResponseHandlers {
  onEvent?: (event: ResponseStreamEvent) => void;
  onText?: (delta: string, snapshot?: string) => void;
}

@Injectable()
export class ChatGPTModel {
  private readonly openai: openai.OpenAI;
  constructor(
    private readonly configService: EnvConfigService,
    private readonly logger: TSLogger,
  ) {
    this.openai = new openai.OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateResponse(input: string, model: openai.OpenAI.AllModels) {
    const response = await this.openai.responses.create({
      model,
      input,
      store: true,
    });
    return response;
  }

  async generateResponseStream(
    input: string,
    model: openai.OpenAI.AllModels,
    handlers?: ChatGPTResponseHandlers,
  ): Promise<ChatGPTResponseStream> {
    const stream = this.openai.responses.stream({
      model,
      input,
    });

    // 청크 단위 텍스트 델타 콘솔 로깅 및 콜백 전달
    stream.on('event', (event: ResponseStreamEvent) => {
      if (event.type === 'response.output_text.delta') {
        // eslint-disable-next-line no-console
        console.log(event.delta);
        if (handlers?.onText) {
          const snapshot = (event as any).snapshot as string | undefined;
          handlers.onText(event.delta as unknown as string, snapshot);
        }
      }
      if (handlers?.onEvent) handlers.onEvent(event);
    });

    return stream as unknown as ChatGPTResponseStream;
  }
}
