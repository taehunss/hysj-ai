import { Body, Controller, Post } from '@nestjs/common';
import { HoroscopeInput } from './dto/horoscope.input';
import { GetHoroscopeUsecase } from './get.horoscope.usecase';

@Controller('horoscope')
export class HoroscopeController {
  constructor(private readonly getHoroscopeUsecase: GetHoroscopeUsecase) {}

  @Post()
  async start(@Body() body: HoroscopeInput) {
    return this.getHoroscopeUsecase.execute(body);
  }
}
