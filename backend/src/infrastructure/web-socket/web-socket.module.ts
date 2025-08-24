import { Module } from '@nestjs/common';
import { WebSocketGateway } from './web-socket.gateway';
import { WebSocketService } from './web-socket.service';

@Module({
  providers: [WebSocketGateway, WebSocketService],
  exports: [WebSocketService],
})
export class WebSocketModule {}
