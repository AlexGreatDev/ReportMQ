import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from '../invoice/invoice.controller';
import { InvoiceService } from '../invoice/invoice.service';
import { CreateInvoiceDto } from '../invoice/invoice.dto';
import { NotFoundException } from '@nestjs/common';

describe('InvoiceController', () => {
  let invoiceController: InvoiceController;

  const mockInvoiceService = {
    createInvoice: jest.fn(),
    getInvoiceById: jest.fn(),
    getAllInvoices: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: mockInvoiceService,
        },
      ],
    }).compile();

    invoiceController = module.get<InvoiceController>(InvoiceController);
  });

  describe('createInvoice', () => {
    it('should create an invoice and return it', async () => {
      const createInvoiceDto: CreateInvoiceDto = {
        customer: 'John Doe',
        amount: 100,
        reference: 'INV-123',
        date: new Date(),
        items: [
          { sku: 'item1', qt: 2 },
          { sku: 'item2', qt: 3 },
        ],
      };

      const result = {
        ...createInvoiceDto,
        id: 'some-unique-id',
      };

      mockInvoiceService.createInvoice.mockResolvedValue(result);

      expect(await invoiceController.createInvoice(createInvoiceDto)).toEqual(
        result,
      );
      expect(mockInvoiceService.createInvoice).toHaveBeenCalledWith(
        createInvoiceDto,
      );
    });
  });

  describe('getInvoiceById', () => {
    it('should return an invoice by ID', async () => {
      const result = {
        id: 'some-unique-id',
        customer: 'John Doe',
        amount: 100,
        reference: 'INV-123',
        date: new Date(),
        items: [{ sku: 'item1', qt: 2 }],
      };

      mockInvoiceService.getInvoiceById.mockResolvedValue(result);

      expect(await invoiceController.getInvoiceById('some-unique-id')).toEqual(
        result,
      );
      expect(mockInvoiceService.getInvoiceById).toHaveBeenCalledWith(
        'some-unique-id',
      );
    });

    it('should throw an exception if invoice not found', async () => {
      mockInvoiceService.getInvoiceById.mockResolvedValue(null);

      try {
        await invoiceController.getInvoiceById('some-unique-id');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.response.message).toBe('Invoice not found');
      }
    });
  });

  describe('getAllInvoices', () => {
    it('should return all invoices', async () => {
      const result = [
        {
          id: 'some-unique-id',
          customer: 'John Doe',
          amount: 100,
          reference: 'INV-123',
          date: new Date(),
          items: [{ sku: 'item1', qt: 2 }],
        },
        {
          id: 'another-unique-id',
          customer: 'Jane Doe',
          amount: 200,
          reference: 'INV-124',
          date: new Date(),
          items: [{ sku: 'item2', qt: 3 }],
        },
      ];

      mockInvoiceService.getAllInvoices.mockResolvedValue(result);

      expect(await invoiceController.getAllInvoices()).toEqual(result);
      expect(mockInvoiceService.getAllInvoices).toHaveBeenCalled();
    });
  });
});
