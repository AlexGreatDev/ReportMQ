import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  @MessagePattern(process.env.RABBITMQ_QUEUE)
  async handleSalesReport(@Payload() salesReport: any): Promise<void> {
    console.log('Received sales report:', salesReport);
  }
}
