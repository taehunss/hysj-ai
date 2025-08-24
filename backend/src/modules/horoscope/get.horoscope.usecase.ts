import { Injectable } from '@nestjs/common';
import { Lunar, Solar } from 'lunar-typescript';
import { ChatGPTModel } from 'src/infrastructure/llm-model/chat-gpt.model';
import { TSLogger } from 'src/infrastructure/logger/logger';
import { HoroscopeInput, HoroscopeType } from './dto/horoscope.input';

@Injectable()
export class GetHoroscopeUsecase {
  constructor(
    private readonly logger: TSLogger,
    private readonly chatGPTModel: ChatGPTModel,
  ) {}

  async execute(
    input: HoroscopeInput,
  ): Promise<{ output_text: string; input_text: string }> {
    const horoscope =
      input.type === HoroscopeType.SOLAR
        ? this.getHoroscopeBySolar(input)
        : this.getHoroscopeByLunar(input);
    this.logger.log(horoscope);
    const input_text = `
    horoscope: ${horoscope}
    이 정보를 간단히 해석해줘
    `;
    const response = await this.chatGPTModel.generateResponse(
      input_text,
      'o3-mini',
    );
    this.logger.log(response);
    return {
      input_text,
      output_text: response.output_text,
    };
  }

  async executeStream(input: HoroscopeInput): Promise<string> {
    const horoscope = this.getHoroscopeBySolar(input);

    const responseStream = await this.chatGPTModel.generateResponseStream(
      horoscope,
      'gpt-5',
      {
        onText: (delta: string, snapshot?: string) => {
          this.logger.log(delta, snapshot);
        },
      },
    );

    await responseStream.subscribe({
      next: (delta) => {
        this.logger.log(delta);
      },
    });

    return 'success';
  }

  private getHoroscopeBySolar(input: HoroscopeInput) {
    const solar = Solar.fromYmdHms(
      input.year,
      input.month,
      input.day,
      input.hour,
      input.minute,
      0,
    );
    const lunar = solar.getLunar();

    const horoscope = `
    solar: ${solar.toFullString()}
    lunar: ${lunar.toFullString()}
  `;

    return horoscope;
  }

  private getHoroscopeByLunar(input: HoroscopeInput) {
    const lunar = Lunar.fromYmdHms(
      input.year,
      input.month,
      input.day,
      input.hour,
      input.minute,
      0,
    );

    const horoscope = `
    lunar: ${lunar.toFullString()}
  `;

    return horoscope;
  }
}
