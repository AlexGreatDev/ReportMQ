import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './invoice.model';
import { CreateInvoiceDto } from './invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const createdInvoice = await this.invoiceModel.create(createInvoiceDto);
    return createdInvoice;
  }

  async getInvoiceById(id: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(id).exec();
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }

  async getAllInvoices(dateRange?: {
    startDate: Date;
    endDate: Date;
  }): Promise<Invoice[]> {
    const query = this.invoiceModel.find();

    if (dateRange) {
      const { startDate, endDate } = dateRange;

      if (startDate) {
        query.where('date').gte(startDate.getTime());
      }

      if (endDate) {
        query.where('date').lte(endDate.getTime());
      }
    }

    return query.exec();
  }
}
