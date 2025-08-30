import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Solar } from 'lunar-typescript';
import { ResponseStreamParams } from 'openai/lib/responses/ResponseStream';
import { Socket } from 'socket.io';
import { LOGGER, Logger } from 'src/common/logger/logger.interface';
import { PersonEntity } from 'src/infrastructure/database/entity/person.entity';
import { ChatGPTModel } from 'src/infrastructure/llm-model/chat-gpt.model';
import { WebSocketService } from 'src/infrastructure/web-socket/web-socket.service';
import { Repository } from 'typeorm';
import { ChatEvent } from './event/chat.event';
import { BASE_INSTRUCTIONS } from './prompt/base.prompt';
// import {Solar, Lunar, HolidayUtil} from 'lunar-typescript';

@Injectable()
export class ChatHandler {
  constructor(
    @Inject(LOGGER)
    private readonly logger: Logger,
    private readonly chatGPTModel: ChatGPTModel,
    private readonly ws: WebSocketService,
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  onModuleInit() {
    this.ws.on('chat', async (client: Socket, payload: ChatEvent) => {
      const stream$ = await this.handle(payload);
      const sub = stream$.subscribe({
        next: (delta) => {
          client.emit('chat:delta', delta);
          console.log(delta);
        },
        error: (err) => client.emit('chat:error', String(err?.message ?? err)),
        complete: async () => {
          const res = await this.handle(payload);
          client.emit('chat:response', res);
          client.disconnect();
        },
      });

      client.on('disconnect', () => sub.unsubscribe());
    });
  }

  // 스트림을 노출해 게이트웨이/레지스트라에서 직접 전달 가능
  async handle(event: ChatEvent) {
    const person = (await this.personRepository.find())[0];
    const solar = Solar.fromYmdHms(
      person.birthYear,
      person.birthMonth,
      person.birthDay,
      person.birthHour,
      person.birthMinute,
      0,
    );
    const lunarString = solar.getLunar().toFullString();
    const solarString = solar.toFullString();
    const input: ResponseStreamParams = {
      input: [
        {
          role: 'user',
          content: event.message,
        },
        {
          role: 'system',
          content: `
          양력 정보: ${solarString}
          음력 정보: ${lunarString}

          넌 사주 전문가다. 이 양력과 음력 정보를 참고해서 답변해
          `,
        },
      ],
      instructions: BASE_INSTRUCTIONS,
    };
    this.logger;
    return this.chatGPTModel.generateResponseStream(input, 'gpt-4o');
  }
}
