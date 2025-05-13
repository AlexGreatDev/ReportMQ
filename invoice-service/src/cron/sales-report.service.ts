import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InvoiceService } from '../invoice/invoice.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class SalesReportService {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Cron('0 12 * * *')
  async generateDailyReport() {
    const today = new Date();
    const dateRange = {
      startDate: new Date(today.setHours(0, 0, 0, 0)),
      endDate: new Date(today.setHours(23, 59, 59, 999)),
    };
    const invoices = await this.invoiceService.getAllInvoices(dateRange);
    const dailySales = invoices.reduce(
      (acc, invoice) => {
        acc.totalSales += invoice.amount;
        invoice.items.forEach((item) => {
          acc.itemSales[item.sku] = (acc.itemSales[item.sku] || 0) + item.qt;
        });
        return acc;
      },
      { totalSales: 0, itemSales: {} },
    );

    await this.rabbitMQService.publishToQueue(
      process.env.RABBITMQ_QUEUE,
      dailySales,
    );
    return dailySales;
  }
}
