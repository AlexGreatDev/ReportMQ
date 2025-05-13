import { Module } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { EmailService } from '../email/email.service';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  providers: [EmailSenderService, EmailService],
  exports: [EmailSenderService],
})
export class EmailSenderModule {}
