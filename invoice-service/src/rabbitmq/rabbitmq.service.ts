import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);

  @Inject('RABBITMQ_SERVICE')
  private readonly client: ClientProxy;

  async publishToQueue(queue: string, message: any) {
    await this.client.emit(queue, message);
  }
}
