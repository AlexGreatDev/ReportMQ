import { Module } from '@nestjs/common';
import { SalesReportService } from './sales-report.service';
import { InvoiceModule } from '../invoice/invoice.module';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RabbitMQModule, InvoiceModule, ConfigModule],
  providers: [SalesReportService],
  exports: [SalesReportService],
})
export class SalesReportModule {}
