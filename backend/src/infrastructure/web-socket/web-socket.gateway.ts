import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  WebSocketGateway as NestWebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketService } from './web-socket.service';

@Injectable()
@NestWebSocketGateway({
  namespace: 'ws',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
  path: '/socket.io',
  allowEIO3: true,
})
export class WebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly ws: WebSocketService) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.ws.setServer(server);
  }

  handleConnection(client: Socket) {
    this.ws.join(client, 'room');
  }

  handleDisconnect(client: Socket) {
    this.ws.leave(client, 'room');
  }

  // 모든 클라이언트의 이벤트를 단일 지점으로 받아 서비스로 위임
  @SubscribeMessage('event')
  onEvent(
    @MessageBody() body: { event: string; payload?: any },
    @ConnectedSocket() client: Socket,
  ) {
    const { event, payload } = body || {};
    if (!event) return;
    this.ws.dispatch(event, client, payload);
  }
}
