import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TSLogger } from './logger';

@Injectable()
@WebSocketGateway({
  namespace: 'logs',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
  path: '/socket.io',
  allowEIO3: true,
})
export class LogViewerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly logger: TSLogger) {}
  @WebSocketServer() server: Server;
  private clients: number = 0;

  handleConnection(client: Socket) {
    try {
      this.clients++;
      this.logger.log(
        `Client connected: ${client.id}, Total clients: ${this.clients}`,
        'LogViewerGateway',
      );
    } catch (error) {
      this.logger.error(error, 'LogViewerGateway');
    }
  }

  handleDisconnect(client: Socket) {
    try {
      this.clients--;
      this.logger.log(
        `Client disconnected: ${client.id}, Total clients: ${this.clients}`,
        'LogViewerGateway',
      );
    } catch (error) {
      this.logger.error(error, 'LogViewerGateway');
    }
  }

  // EventEmitter2에서 발생한 로그 이벤트를 리스닝
  @OnEvent('log.message')
  handleLogEvent(logEvent: any) {
    try {
      if (!this.server || this.clients === 0) return; // 연결된 클라이언트가 없으면 무시

      // 로그 이벤트를 문자열로 포맷팅
      let logMessage = `[${logEvent.timestamp}] ${logEvent.level.toUpperCase()}`;

      // 컨텍스트가 있으면 추가
      if (logEvent.context) {
        logMessage += ` [${logEvent.context}]`;
      }

      // 메시지 추가
      logMessage += ` ${logEvent.message}`;

      // 추가 정보가 있으면 포함
      if (logEvent.additionalInfo && logEvent.additionalInfo.length > 0) {
        logMessage += ` - ${JSON.stringify(logEvent.additionalInfo)}`;
      }

      // 소켓으로 로그 메시지 전송
      this.server.emit('log', logMessage);
    } catch (error) {
      this.logger.error(error, 'LogViewerGateway');
    }
  }
}
