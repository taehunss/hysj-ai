import { Injectable } from '@nestjs/common';
import * as openai from 'openai';
import { ResponseStreamParams } from 'openai/lib/responses/ResponseStream';
import type { ResponseStreamEvent } from 'openai/resources/responses/responses';
import { Observable } from 'rxjs';
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
    input: ResponseStreamParams,
    model: openai.OpenAI.AllModels,
    handlers?: ChatGPTResponseHandlers,
  ) {
    return new Observable<string>((subscriber) => {
      const stream: any = this.openai.responses.stream({
        model,
        ...input,
      });
      let completed = false;
      let cancelled = false;

      const onEvent = (event: ResponseStreamEvent) => {
        if (event.type === 'response.output_text.delta') {
          const delta = (event.delta as unknown as string) ?? '';
          handlers?.onText?.(
            delta,
            (event as any).snapshot as string | undefined,
          );
          subscriber.next(delta);
        }
        handlers?.onEvent?.(event);
        if (event.type === 'response.completed') {
          completed = true;
          subscriber.complete();
        }
      };

      stream.on('event', onEvent);

      stream.on?.('error', (e: any) => {
        // 사용자가 중단(abort)한 케이스는 오류로 전파하지 않고 종료 처리
        const name = e?.name || e?.constructor?.name || '';
        const msg = typeof e?.message === 'string' ? e.message : String(e);
        if (cancelled || name.includes('Abort') || /aborted/i.test(msg)) {
          if (!completed) subscriber.complete();
          return;
        }
        subscriber.error(e);
      });

      stream.on?.('end', () => subscriber.complete());

      return () => {
        // 중단 신호를 보내지 않고 구독만 정리하여 OpenAI SDK의 Abort 예외를 회피한다.
        cancelled = true;
        try {
          stream.off?.('event', onEvent);
        } catch {}
      };
    });
  }
}
