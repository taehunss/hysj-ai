import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LOGGER } from './common/logger/logger.interface';
import { EnvConfigService } from './infrastructure/env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerBootstrap(app);
  const configService = app.get(EnvConfigService);
  // main.ts
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    exposedHeaders: ['Content-Disposition'],
  });
  const logger = app.get(LOGGER);
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
