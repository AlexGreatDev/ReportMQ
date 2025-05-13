import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
@Injectable()
export class EmailSenderService {
  constructor(
    private readonly rmqService: RabbitMQService,
    private readonly emailService: EmailService,
  ) {
    this.rmqService.handleSalesReport = this.handleSalesReport.bind(this);
  }

  async handleSalesReport(salesReport: any): Promise<void> {
    try {
      await this.sendEmail(salesReport);
    } catch (error) {
      console.error('Error sending sales report email:', error);
    }
  }

  async sendEmail(report: any) {
    const emailContent = `
      Total Sales: $${report.totalSales}
      Item Sales: ${JSON.stringify(report.itemSales)}
    `;
    await this.emailService.sendEmail(
      'example@example.com',
      'Daily Sales Report',
      emailContent,
    );
  }
}
