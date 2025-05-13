import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from '../invoice/invoice.service';
import { Invoice } from '../invoice/invoice.model';
import { getModelToken } from '@nestjs/mongoose';
import { CreateInvoiceDto } from '../invoice/invoice.dto';
import { Model } from 'mongoose';

describe('InvoiceService', () => {
  let invoiceService: InvoiceService;
  let invoiceModel: Model<Invoice>;

  beforeEach(async () => {
    const mockInvoiceModel = {
      create: jest.fn().mockResolvedValue({
        customer: 'John Doe',
        amount: 100,
        reference: 'INV123',
        date: new Date(),
        items: [{ sku: 'ITEM001', qt: 2 }],
      }),

      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          {
            customer: 'John Doe',
            amount: 100,
            reference: 'INV123',
            date: new Date(),
            items: [{ sku: 'ITEM001', qt: 2 }],
          },
        ]),
      }),
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        { provide: getModelToken('Invoice'), useValue: mockInvoiceModel },
      ],
    }).compile();

    invoiceService = module.get<InvoiceService>(InvoiceService);
    invoiceModel = module.get<Model<Invoice>>(getModelToken('Invoice'));
  });

  it('should be defined', () => {
    expect(invoiceService).toBeDefined();
  });

  it('should create an invoice', async () => {
    const createInvoiceDto: CreateInvoiceDto = {
      customer: 'John Doe',
      amount: 100,
      reference: 'INV123',
      date: new Date(),
      items: [{ sku: 'ITEM001', qt: 2 }],
    };

    const result = await invoiceService.createInvoice(createInvoiceDto);
    expect(result).toHaveProperty('customer', createInvoiceDto.customer);
    expect(result).toHaveProperty('amount', createInvoiceDto.amount);
    expect(result).toHaveProperty('reference', createInvoiceDto.reference);
    expect(result.items.length).toBe(createInvoiceDto.items.length);
  });

  it('should find all invoices', async () => {
    const result = await invoiceService.getAllInvoices();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('customer', 'John Doe');
  });

  it('should find an invoice by ID', async () => {
    const invoiceId = '60f4f77e64f7a2f8f8c2e123';
    const mockInvoice = {
      customer: 'John Doe',
      amount: 100,
      reference: 'INV123',
      date: new Date(),
      items: [{ sku: 'ITEM001', qt: 2 }],
    };

    invoiceModel.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockInvoice),
    });
    const result = await invoiceService.getInvoiceById(invoiceId);
    expect(result).toHaveProperty('customer', 'John Doe');
    expect(result).toHaveProperty('amount', 100);
  });

  it('should throw an error when invoice not found', async () => {
    const invoiceId = '60f4f77e64f7a2f8f8c2e123';

    await expect(invoiceService.getInvoiceById(invoiceId)).rejects.toThrow(
      'Invoice not found',
    );
  });
});
