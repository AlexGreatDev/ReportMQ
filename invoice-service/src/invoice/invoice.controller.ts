import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './invoice.dto';
import { Invoice } from './invoice.model';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<Invoice> {
    return this.invoiceService.createInvoice(createInvoiceDto);
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.getInvoiceById(id);
  }

  @Get()
  async getAllInvoices(): Promise<Invoice[]> {
    return this.invoiceService.getAllInvoices();
  }
}
