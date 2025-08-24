import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ChatModule } from './modules/chat/chat.module';
import { PersonModule } from './modules/person/person.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [InfrastructureModule, PersonModule, ChatModule, UserModule],
})
export class AppModule {}
