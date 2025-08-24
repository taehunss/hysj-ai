import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WebSocketEventHandler } from 'src/common/web-socket.event.handler';
import { ChatGPTModel } from 'src/infrastructure/llm-model/chat-gpt.model';
import { TSLogger } from 'src/infrastructure/logger/logger';
import { WebSocketService } from 'src/infrastructure/web-socket/web-socket.service';
import { ChatEvent, ChatResponse } from './event/chat.event';
import { BASE_INSTRUCTIONS } from './prompt/base.prompt';

@Injectable()
export class ChatHandler
  implements WebSocketEventHandler<ChatEvent, ChatResponse>
{
  constructor(
    private readonly logger: TSLogger,
    private readonly chatGPTModel: ChatGPTModel,
    private readonly ws: WebSocketService,
  ) {}

  onModuleInit() {
    this.ws.on('chat', async (client: Socket, payload: ChatEvent) => {
      const stream$ = await this.stream(payload);
      const sub = stream$.subscribe({
        next: (delta) => {
          client.emit('chat:delta', delta);
          console.log(delta);
        },
        error: (err) => client.emit('chat:error', String(err?.message ?? err)),
        complete: async () => {
          const res = await this.handle(payload);
          client.emit('chat:response', res);
        },
      });

      client.on('disconnect', () => sub.unsubscribe());
    });
  }

  async handle(event: ChatEvent): Promise<ChatResponse> {
    try {
      this.logger.log(this.constructor.name, event);
      const observable = await this.chatGPTModel.generateResponseStream(
        {
          input: [
            {
              role: 'user',
              content: event.message,
            },
          ],
          instructions: BASE_INSTRUCTIONS,
        },
        'o3-mini',
      );

      let final = '';
      await new Promise<void>((resolve, reject) => {
        const sub = observable.subscribe({
          next: (delta) => (final += delta),
          error: reject,
          complete: () => {
            sub.unsubscribe();
            resolve();
          },
        });
      });
      return { message: final };
    } catch (error) {
      this.logger.error(this.constructor.name, error);
    }
  }

  // 스트림을 노출해 게이트웨이/레지스트라에서 직접 전달 가능
  async stream(event: ChatEvent) {
    return this.chatGPTModel.generateResponseStream(
      {
        input: [
          {
            role: 'user',
            content: event.message,
          },
        ],
        instructions: BASE_INSTRUCTIONS,
      },
      'o3-mini',
    );
  }
}
