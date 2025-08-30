import { ConsoleLogger, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from 'src/common/logger/logger.interface';

@Injectable()
export class TSLogger extends ConsoleLogger implements Logger {
  constructor(private readonly eventEmitter: EventEmitter2) {
    super();
  }

  getTimestamp(): string {
    return new Date(Date.now()).toISOString();
  }

  // 기존 log 메소드 오버라이드
  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
    this.emitLogEvent('log', message, ...optionalParams);
  }

  // 기존 error 메소드 오버라이드
  error(message: any, ...optionalParams: any[]) {
    super.error(message, ...optionalParams);
    this.emitLogEvent('error', message, ...optionalParams);
  }

  // 기존 warn 메소드 오버라이드
  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
    this.emitLogEvent('warn', message, ...optionalParams);
  }

  // 기존 debug 메소드 오버라이드
  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, ...optionalParams);
    this.emitLogEvent('debug', message, ...optionalParams);
  }

  // 이벤트 발생 메소드
  private emitLogEvent(level: string, message: any, ...optionalParams: any[]) {
    if (this.eventEmitter) {
      // 로그 메시지와 컨텍스트 등을 포함한 이벤트 객체 생성
      const logEvent = {
        timestamp: this.getTimestamp(),
        level,
        message,
        context: optionalParams[0] || '',
        additionalInfo: optionalParams.slice(1) || [],
      };

      // 'log.message' 이벤트를 발생시켜 로그 메시지 전파
      this.eventEmitter.emit('log.message', logEvent);
    }
  }
}
