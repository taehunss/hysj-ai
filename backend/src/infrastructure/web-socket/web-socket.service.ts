import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

export type WsHandler = (client: Socket, payload?: any) => Promise<any> | any;

@Injectable()
export class WebSocketService {
  private readonly logger = new Logger(WebSocketService.name);
  private server?: Server;
  private readonly handlers = new Map<string, Set<WsHandler>>();

  setServer(server: Server) {
    this.server = server;
  }

  getServer(): Server | undefined {
    return this.server;
  }

  // 핸들러 등록/해제
  on(event: string, handler: WsHandler) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off(event: string, handler: WsHandler) {
    this.handlers.get(event)?.delete(handler);
  }

  // 게이트웨이에서 모든 클라이언트 이벤트를 위임받아 라우팅
  async dispatch(event: string, client: Socket, payload?: any) {
    const set = this.handlers.get(event);
    if (!set || set.size === 0) {
      this.logger.debug(`No handler for event: ${event}`);
      return;
    }
    for (const handler of set) {
      try {
        await handler(client, payload);
      } catch (error) {
        this.logger.error(`Handler error on ${event}: ${error}`);
      }
    }
  }

  // 송신 유틸
  emit<T = any>(event: string, data: T) {
    this.server?.emit(event, data);
  }

  to(room: string) {
    return {
      emit: <T = any>(event: string, data: T) =>
        this.server?.to(room).emit(event, data),
    };
  }

  join(client: Socket, room: string) {
    return client.join(room);
  }

  leave(client: Socket, room: string) {
    return client.leave(room);
  }
}
