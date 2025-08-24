import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvConfigService } from './infrastructure/env-config/env-config.service';
import { TSLogger } from './infrastructure/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerBootstrap(app);
  const configService = app.get(EnvConfigService);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  const logger = app.get(TSLogger);
  app.useGlobalPipes(new ValidationPipe());
  const serverPort = configService.get<number>('SERVER_PORT');
  logger.log(`Server is running on port ${serverPort}`);
  await app.listen(serverPort);
}
bootstrap();
function swaggerBootstrap(app) {
  const config = new DocumentBuilder()
    .setTitle('한양사주 AI API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
