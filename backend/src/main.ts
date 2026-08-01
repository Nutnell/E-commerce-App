import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dns from 'dns';
import helmet from 'helmet';

dns.setDefaultResultOrder('verbatim');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security Fix #14: Global validation pipe strips unknown properties and enforces DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Security: Helmet adds security headers (X-Content-Type-Options, X-Frame-Options, etc.)
  app.use(helmet());

  // Security Fix #6: CORS restricted to allowed frontend origin instead of wildcard
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
