import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Import the root module
import { Logger } from '@nestjs/common'; // For logging
import { Transport } from '@nestjs/microservices'; // For RabbitMQ or microservices
import { MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Invoice')
    .setDescription('The Invoice API description')
    .setVersion('1.0')
    .addTag('Invoice')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000, () => {
    Logger.log('HTTP Server running on http://localhost:3000');
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.RABBITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  Logger.log('Microservices (RabbitMQ) are running');
}

bootstrap();
